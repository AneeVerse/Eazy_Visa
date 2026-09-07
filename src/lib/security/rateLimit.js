import { createHmac } from 'node:crypto';
import dbConnect from '../dbConnect';
import FormRateLimit from '../../models/FormRateLimit';

const MINUTE_MS = 60 * 1000;
const RETENTION_MS = 60 * MINUTE_MS;
const DATABASE_RETRY_MS = MINUTE_MS;
const MAX_FALLBACK_BUCKETS = 5000;
const RATE_LIMIT_STATE = Symbol.for('eazy-visas.form-rate-limit-state');

const getRateLimitState = () => {
  if (!globalThis[RATE_LIMIT_STATE]) {
    globalThis[RATE_LIMIT_STATE] = {
      buckets: new Map(),
      databaseRetryAt: 0,
    };
  }

  return globalThis[RATE_LIMIT_STATE];
};

export const normalizeEmail = (value = '') =>
  String(value).trim().toLowerCase();

export const normalizePhone = (value = '') =>
  String(value).replace(/\D/g, '');

export const getClientIp = (request) => {
  const forwardedIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    '';

  const firstIp = forwardedIp.split(',')[0]?.trim();
  return firstIp && firstIp.length <= 128 ? firstIp : null;
};

const getHashSecret = () => {
  const secret = process.env.RATE_LIMIT_HASH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      'RATE_LIMIT_HASH_SECRET must be configured with at least 32 characters.'
    );
  }

  return secret;
};

const createBucketKey = ({ namespace, identifier, windowStart }) => {
  const digest = createHmac('sha256', getHashSecret())
    .update(`${namespace}:${windowStart}:${identifier}`)
    .digest('hex');

  return `${namespace}:${digest}`;
};

const incrementBucket = async ({ key, expiresAt }) => {
  try {
    return await FormRateLimit.findOneAndUpdate(
      { key },
      {
        $inc: { count: 1 },
        $setOnInsert: { expiresAt },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();
  } catch (error) {
    // Two serverless instances can race to create the same unique bucket.
    if (error?.code !== 11000) throw error;

    return FormRateLimit.findOneAndUpdate(
      { key },
      { $inc: { count: 1 } },
      { new: true }
    ).lean();
  }
};

const incrementFallbackBucket = ({ key, now, windowEnd }) => {
  const state = getRateLimitState();

  for (const [bucketKey, bucket] of state.buckets) {
    if (bucket.expiresAt <= now) {
      state.buckets.delete(bucketKey);
    }
  }

  const existingBucket = state.buckets.get(key);
  const count = (existingBucket?.count ?? 0) + 1;
  state.buckets.set(key, { count, expiresAt: windowEnd });

  while (state.buckets.size > MAX_FALLBACK_BUCKETS) {
    const oldestKey = state.buckets.keys().next().value;
    if (oldestKey === undefined) break;
    state.buckets.delete(oldestKey);
  }

  return count;
};

export const consumeRateLimit = async ({
  namespace,
  identifier,
  limit,
  windowMs,
}) => {
  if (!identifier) {
    return {
      allowed: true,
      remaining: limit,
      retryAfterSeconds: 0,
    };
  }

  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const windowEnd = windowStart + windowMs;
  const expiresAt = new Date(windowEnd + RETENTION_MS);
  const key = createBucketKey({ namespace, identifier, windowStart });
  const state = getRateLimitState();
  let count;

  if (now >= state.databaseRetryAt) {
    state.databaseRetryAt = now + DATABASE_RETRY_MS;

    try {
      await dbConnect();
      const bucket = await incrementBucket({ key, expiresAt });
      count = bucket?.count ?? 1;
      state.databaseRetryAt = 0;
    } catch (error) {
      console.warn(
        'Mongo rate limiter unavailable; using per-instance fallback:',
        error?.message
      );
    }
  }

  if (count === undefined) {
    count = incrementFallbackBucket({ key, now, windowEnd });
  }

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfterSeconds: Math.max(1, Math.ceil((windowEnd - now) / 1000)),
  };
};
