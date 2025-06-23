"use client";
import { useEffect } from 'react';

const ConversionTracking = ({ conversionLabel = 'lNOxCMTyiN8aEOyJ_8gp', value = 1500.0, currency = 'INR' }) => {
  useEffect(() => {
    // Ensure gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('Firing Google Ads conversion event:', conversionLabel);
      
      window.gtag('event', 'conversion', {
        'send_to': `AW-11158930668/${conversionLabel}`,
        'value': value,
        'currency': currency
      });
    } else {
      console.log('gtag not available, conversion not tracked');
    }
  }, [conversionLabel, value, currency]);

  return null; // This component doesn't render anything
};

export default ConversionTracking; 