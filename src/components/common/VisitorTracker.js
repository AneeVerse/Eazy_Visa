"use client";

import { useEffect, useRef } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";

export default function VisitorTracker() {
  const userGeo = useGeoLocation();
  const tracked = useRef(false);

  useEffect(() => {
    if (!userGeo || tracked.current) return;
    tracked.current = true;
    fetch('/api/track-visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip:        userGeo.ip,
        city:      userGeo.city,
        region:    userGeo.region,
        country:   userGeo.country,
        pincode:   userGeo.pincode,
        pageUrl:   window.location.href,
        referrer:  document.referrer || 'Direct',
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [userGeo]);

  return null;
}
