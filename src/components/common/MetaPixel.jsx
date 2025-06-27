"use client";
import { useEffect } from 'react';

const MetaPixel = ({ pixelId = '1366921161271735' }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Meta Pixel Code
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
      
      console.log('Meta Pixel initialized with ID:', pixelId);
    }
  }, [pixelId]);

  return (
    <>
      {/* Meta Pixel NoScript fallback */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default MetaPixel; 