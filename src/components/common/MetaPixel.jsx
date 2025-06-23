"use client";
import { useEffect } from 'react';

const MetaPixel = ({ pixelId = 'YOUR_PIXEL_ID_HERE' }) => {
  useEffect(() => {
    // Meta Pixel will be implemented here when pixel ID is provided by Shaheen
    if (typeof window !== 'undefined' && pixelId !== 'YOUR_PIXEL_ID_HERE') {
      console.log('Meta Pixel initialized:', pixelId);
      
      // Meta Pixel base code will go here
      // !function(f,b,e,v,n,t,s)
      // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      // n.queue=[];t=b.createElement(e);t.async=!0;
      // t.src=v;s=b.getElementsByTagName(e)[0];
      // s.parentNode.insertBefore(t,s)}(window,document,'script',
      // 'https://connect.facebook.net/en_US/fbevents.js');
      // fbq('init', pixelId);
      // fbq('track', 'PageView');
    } else {
      console.log('Meta Pixel placeholder - waiting for pixel ID from Shaheen');
    }
  }, [pixelId]);

  return (
    <>
      {/* Meta Pixel NoScript fallback will go here when implemented */}
      {pixelId !== 'YOUR_PIXEL_ID_HERE' && (
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }} 
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
};

export default MetaPixel; 