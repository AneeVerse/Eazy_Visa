'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

const SubmissionProtectionFields = ({
  action,
  widgetRef,
  website,
  onWebsiteChange,
  error,
  onWidgetLoad,
  onWidgetUnload,
  onSuccess,
  onError,
  onExpire,
  onUnsupported,
  className = '',
}) => {
  const generatedId = useId().replace(/:/g, '');
  const containerRef = useRef(null);
  const [widgetSize, setWidgetSize] = useState('flexible');

  useEffect(() => () => onWidgetUnload?.(), [onWidgetUnload]);

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(([entry]) => {
      const nextSize = entry.contentRect.width < 300 ? 'compact' : 'flexible';
      setWidgetSize((currentSize) =>
        currentSize === nextSize ? currentSize : nextSize
      );
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative min-w-0 ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={`website-${generatedId}`}>Website</label>
        <input
          id={`website-${generatedId}`}
          name="website"
          type="text"
          value={website}
          onChange={(event) => onWebsiteChange(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <Turnstile
          key={widgetSize}
          ref={widgetRef}
          id={`turnstile-${action}-${generatedId}`}
          siteKey={TURNSTILE_SITE_KEY}
          injectScript={false}
          onWidgetLoad={onWidgetLoad}
          onSuccess={onSuccess}
          onError={onError}
          onExpire={onExpire}
          onTimeout={onError}
          onUnsupported={onUnsupported}
          options={{
            action,
            appearance: 'interaction-only',
            execution: 'execute',
            refreshExpired: 'auto',
            refreshTimeout: 'auto',
            responseField: false,
            retry: 'auto',
            size: widgetSize,
            theme: 'auto',
          }}
        />
      ) : (
        <p className="text-sm text-red-600" role="alert">
          Security verification is temporarily unavailable.
        </p>
      )}

      <p
        className={`mt-2 text-sm text-red-600 ${error ? '' : 'sr-only'}`}
        role="status"
        aria-live="polite"
      >
        {error || 'Security verification is ready.'}
      </p>
    </div>
  );
};

export default SubmissionProtectionFields;
