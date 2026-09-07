'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
const VERIFICATION_TIMEOUT_MS = 35 * 1000;
const DEFAULT_ERROR =
  'Security verification failed. Please check your connection and try again.';

export const useSubmissionProtection = (action) => {
  const widgetRef = useRef(null);
  const pendingVerificationRef = useRef(null);
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const settlePendingVerification = useCallback((type, value) => {
    const pending = pendingVerificationRef.current;
    if (!pending) return;

    clearTimeout(pending.timeoutId);
    pendingVerificationRef.current = null;

    if (type === 'resolve') {
      pending.resolve(value);
    } else {
      pending.reject(value);
    }
  }, []);

  const handleSuccess = useCallback(
    (token) => {
      setError('');
      settlePendingVerification('resolve', token);
    },
    [settlePendingVerification]
  );

  const handleWidgetLoad = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleError = useCallback(
    () => {
      const verificationError = new Error(DEFAULT_ERROR);
      setError(verificationError.message);
      settlePendingVerification('reject', verificationError);
    },
    [settlePendingVerification]
  );

  const handleExpire = useCallback(() => {
    const verificationError = new Error(
      'Security verification expired. Please try again.'
    );
    setError(verificationError.message);
    settlePendingVerification('reject', verificationError);
  }, [settlePendingVerification]);

  const handleUnsupported = useCallback(() => {
    const verificationError = new Error(
      'This browser cannot complete security verification. Please update it or try another browser.'
    );
    setError(verificationError.message);
    settlePendingVerification('reject', verificationError);
  }, [settlePendingVerification]);

  const getProtectionData = useCallback(async () => {
    setError('');

    if (!TURNSTILE_SITE_KEY) {
      const configurationError = new Error(
        'Security verification is temporarily unavailable. Please try again later.'
      );
      setError(configurationError.message);
      throw configurationError;
    }

    if (!widgetRef.current || !isReady) {
      const loadingError = new Error(
        'Security verification is still loading. Please try again in a moment.'
      );
      setError(loadingError.message);
      throw loadingError;
    }

    if (pendingVerificationRef.current) {
      throw new Error('Security verification is already in progress.');
    }

    setIsVerifying(true);

    try {
      const token = await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          const timeoutError = new Error(
            'Security verification timed out. Please try again.'
          );
          setError(timeoutError.message);
          settlePendingVerification('reject', timeoutError);
        }, VERIFICATION_TIMEOUT_MS);

        pendingVerificationRef.current = {
          resolve,
          reject,
          timeoutId,
        };

        try {
          widgetRef.current.execute();
        } catch {
          const executionError = new Error(DEFAULT_ERROR);
          setError(executionError.message);
          settlePendingVerification('reject', executionError);
        }
      });

      return {
        turnstileToken: token,
        website,
      };
    } finally {
      setIsVerifying(false);
    }
  }, [isReady, settlePendingVerification, website]);

  const resetProtection = useCallback(() => {
    const pending = pendingVerificationRef.current;
    if (pending) {
      clearTimeout(pending.timeoutId);
      pendingVerificationRef.current = null;
      pending.reject(new Error('Security verification was cancelled.'));
    }

    setError('');
    setIsVerifying(false);
    widgetRef.current?.reset();
  }, []);

  useEffect(
    () => () => {
      const pending = pendingVerificationRef.current;
      if (pending) {
        clearTimeout(pending.timeoutId);
        pending.reject(new Error('Security verification was cancelled.'));
      }
      pendingVerificationRef.current = null;
    },
    []
  );

  return {
    getProtectionData,
    resetProtection,
    isVerifying,
    protectionFieldProps: {
      action,
      widgetRef,
      website,
      onWebsiteChange: setWebsite,
      error,
      onWidgetLoad: handleWidgetLoad,
      onSuccess: handleSuccess,
      onError: handleError,
      onExpire: handleExpire,
      onUnsupported: handleUnsupported,
    },
  };
};

export default useSubmissionProtection;
