import {
  consumeRateLimit,
  getClientIp,
  normalizeEmail,
  normalizePhone,
} from './rateLimit';
import { verifyTurnstileToken } from './turnstile';

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

export const SUBMISSION_POLICIES = {
  visa_lead: {
    maxBodyBytes: 64 * 1024,
    ip: { limit: 5, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  legacy_visa: {
    maxBodyBytes: 64 * 1024,
    ip: { limit: 5, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  contact: {
    maxBodyBytes: 64 * 1024,
    ip: { limit: 5, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  contact_widget: {
    maxBodyBytes: 64 * 1024,
    ip: { limit: 5, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  newsletter: {
    maxBodyBytes: 16 * 1024,
    ip: { limit: 10, windowMs: HOUR_MS },
    identity: { limit: 2, windowMs: 24 * HOUR_MS },
  },
  flight_booking: {
    maxBodyBytes: 256 * 1024,
    ip: { limit: 3, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  hotel_booking: {
    maxBodyBytes: 256 * 1024,
    ip: { limit: 3, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  preferred_booking: {
    maxBodyBytes: 256 * 1024,
    ip: { limit: 3, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  blog_contact: {
    maxBodyBytes: 64 * 1024,
    ip: { limit: 5, windowMs: 15 * MINUTE_MS },
    identity: { limit: 3, windowMs: HOUR_MS },
  },
  feedback: {
    maxBodyBytes: 16 * 1024,
    ip: { limit: 3, windowMs: HOUR_MS },
    identity: { limit: 3, windowMs: 24 * HOUR_MS },
  },
};

const GLOBAL_IP_LIMIT = {
  limit: 30,
  windowMs: 10 * MINUTE_MS,
};

const jsonResponse = (payload, status, extraHeaders = {}) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });

const rejectionResponse = ({
  status,
  code,
  message,
  retryAfterSeconds,
}) =>
  jsonResponse(
    {
      success: false,
      code,
      message,
      error: message,
    },
    status,
    retryAfterSeconds
      ? { 'Retry-After': String(retryAfterSeconds) }
      : undefined
  );

const rateLimitResponse = (retryAfterSeconds) =>
  rejectionResponse({
    status: 429,
    code: 'RATE_LIMITED',
    message: 'Too many submissions. Please wait and try again.',
    retryAfterSeconds,
  });

const enforceBucket = async ({
  namespace,
  identifier,
  limit,
  windowMs,
}) => {
  const result = await consumeRateLimit({
    namespace,
    identifier,
    limit,
    windowMs,
  });

  return result.allowed ? null : rateLimitResponse(result.retryAfterSeconds);
};

const getIdentityValues = (body) => {
  const email = normalizeEmail(body.email || body.contact?.email || '');
  const phone = normalizePhone(
    body.googleSheetsPhone || body.phone || body.contact?.phone || ''
  );

  return {
    email: email || null,
    phone: phone.length >= 6 ? phone : null,
  };
};

export const protectSubmissionRequest = async (request, action) => {
  const policy = SUBMISSION_POLICIES[action];

  if (!policy) {
    console.error('Unknown submission protection action:', action);
    return {
      ok: false,
      response: rejectionResponse({
        status: 500,
        code: 'PROTECTION_POLICY_MISSING',
        message: 'Unable to process this submission.',
      }),
    };
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return {
      ok: false,
      response: rejectionResponse({
        status: 415,
        code: 'UNSUPPORTED_CONTENT_TYPE',
        message: 'This form submission format is not supported.',
      }),
    };
  }

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > policy.maxBodyBytes) {
    return {
      ok: false,
      response: rejectionResponse({
        status: 413,
        code: 'REQUEST_TOO_LARGE',
        message: 'This form submission is too large.',
      }),
    };
  }

  let rawBody;
  let submittedBody;

  try {
    rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > policy.maxBodyBytes) {
      return {
        ok: false,
        response: rejectionResponse({
          status: 413,
          code: 'REQUEST_TOO_LARGE',
          message: 'This form submission is too large.',
        }),
      };
    }

    submittedBody = JSON.parse(rawBody);
  } catch {
    return {
      ok: false,
      response: rejectionResponse({
        status: 400,
        code: 'INVALID_JSON',
        message: 'Unable to read this form submission.',
      }),
    };
  }

  if (
    !submittedBody ||
    typeof submittedBody !== 'object' ||
    Array.isArray(submittedBody)
  ) {
    return {
      ok: false,
      response: rejectionResponse({
        status: 400,
        code: 'INVALID_BODY',
        message: 'Unable to read this form submission.',
      }),
    };
  }

  const { turnstileToken, website, ...body } = submittedBody;

  if (typeof website === 'string' && website.trim()) {
    return {
      ok: false,
      botDetected: true,
      response: jsonResponse(
        {
          success: true,
          message: 'Submission received.',
        },
        200
      ),
    };
  }

  const ip = getClientIp(request);

  try {
    const globalLimitResponse = await enforceBucket({
      namespace: 'forms:global:ip',
      identifier: ip,
      ...GLOBAL_IP_LIMIT,
    });
    if (globalLimitResponse) {
      return { ok: false, response: globalLimitResponse };
    }

    const routeLimitResponse = await enforceBucket({
      namespace: `forms:${action}:ip`,
      identifier: ip,
      ...policy.ip,
    });
    if (routeLimitResponse) {
      return { ok: false, response: routeLimitResponse };
    }
  } catch (error) {
    console.error('Submission IP rate limiter unavailable:', error?.message);
    return {
      ok: false,
      response: rejectionResponse({
        status: 503,
        code: 'RATE_LIMIT_UNAVAILABLE',
        message: 'This form is temporarily unavailable. Please try again later.',
      }),
    };
  }

  const verification = await verifyTurnstileToken({
    token: turnstileToken,
    ip,
    expectedAction: action,
  });

  if (!verification.success) {
    return {
      ok: false,
      response: rejectionResponse(verification),
    };
  }

  try {
    const identities = getIdentityValues(body);

    for (const [kind, identifier] of Object.entries(identities)) {
      const identityLimitResponse = await enforceBucket({
        namespace: `forms:${action}:${kind}`,
        identifier,
        ...policy.identity,
      });

      if (identityLimitResponse) {
        return { ok: false, response: identityLimitResponse };
      }
    }
  } catch (error) {
    console.error(
      'Submission identity rate limiter unavailable:',
      error?.message
    );
    return {
      ok: false,
      response: rejectionResponse({
        status: 503,
        code: 'RATE_LIMIT_UNAVAILABLE',
        message: 'This form is temporarily unavailable. Please try again later.',
      }),
    };
  }

  return {
    ok: true,
    body,
    clientIp: ip,
  };
};
