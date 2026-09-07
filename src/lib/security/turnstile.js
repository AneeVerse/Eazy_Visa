import { randomUUID } from 'node:crypto';

const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TOKEN_MAX_LENGTH = 2048;
const VERIFY_TIMEOUT_MS = 8000;

const getAllowedHostnames = () => {
  const configured = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (configured.length > 0) return configured;

  if (process.env.NODE_ENV !== 'production') {
    return ['localhost', '127.0.0.1'];
  }

  return [];
};

const verifyWithCloudflare = async ({ token, ip, idempotencyKey }) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);

  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      idempotency_key: idempotencyKey,
    });

    if (ip) body.set('remoteip', ip);

    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Turnstile Siteverify returned ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

export const verifyTurnstileToken = async ({
  token,
  ip,
  expectedAction,
}) => {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    return {
      success: false,
      status: 503,
      code: 'TURNSTILE_NOT_CONFIGURED',
      message: 'Verification is temporarily unavailable. Please try again later.',
    };
  }

  if (typeof token !== 'string' || !token || token.length > TOKEN_MAX_LENGTH) {
    return {
      success: false,
      status: 400,
      code: 'TURNSTILE_REQUIRED',
      message: 'Please complete the security verification and try again.',
    };
  }

  const allowedHostnames = getAllowedHostnames();
  if (allowedHostnames.length === 0) {
    return {
      success: false,
      status: 503,
      code: 'TURNSTILE_HOSTNAMES_NOT_CONFIGURED',
      message: 'Verification is temporarily unavailable. Please try again later.',
    };
  }

  const idempotencyKey = randomUUID();
  let result;

  try {
    result = await verifyWithCloudflare({ token, ip, idempotencyKey });

    if (result?.['error-codes']?.includes('internal-error')) {
      result = await verifyWithCloudflare({ token, ip, idempotencyKey });
    }
  } catch (error) {
    console.error('Turnstile verification unavailable:', error?.message);
    return {
      success: false,
      status: 503,
      code: 'TURNSTILE_UNAVAILABLE',
      message: 'Verification is temporarily unavailable. Please try again.',
    };
  }

  if (!result?.success) {
    console.warn('Turnstile verification rejected:', {
      errors: result?.['error-codes'] || ['unknown-error'],
      expectedAction,
    });

    return {
      success: false,
      status: 400,
      code: 'TURNSTILE_INVALID',
      message: 'Security verification failed. Please try again.',
    };
  }

  if (result.action !== expectedAction) {
    console.warn('Turnstile action mismatch:', {
      expectedAction,
      receivedAction: result.action,
    });

    return {
      success: false,
      status: 400,
      code: 'TURNSTILE_ACTION_MISMATCH',
      message: 'Security verification failed. Please try again.',
    };
  }

  const hostname = String(result.hostname || '').toLowerCase();
  if (!allowedHostnames.includes(hostname)) {
    console.warn('Turnstile hostname mismatch:', {
      receivedHostname: hostname || 'missing',
    });

    return {
      success: false,
      status: 400,
      code: 'TURNSTILE_HOSTNAME_MISMATCH',
      message: 'Security verification failed. Please try again.',
    };
  }

  return {
    success: true,
    hostname,
    challengeTimestamp: result.challenge_ts,
  };
};
