"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Script from 'next/script';

function toTitleCase(input) {
  const decoded = decodeURIComponent(input || "");
  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function BreadcrumbSchema() {
  const pathname = usePathname() || "/";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const siteUrl =
    (typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.NEXT_PUBLIC_SITE_URL) || "https://www.eazyvisas.com";

  const breadcrumbSchema = useMemo(() => {
    // Build from path segments; include Home always
    const segments = pathname.split("/").filter(Boolean);
    const itemListElements = [];

    itemListElements.push({
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl
    });

    // If root path, return only Home
    if (!segments.length) {
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElements
      };
    }

    let cumulativePath = "";
    segments.forEach((segment, index) => {
      cumulativePath += `/${segment}`;
      
      // Custom naming for specific paths
      let name = toTitleCase(segment);
      if (segment === 'blogs') name = 'Blog';
      if (segment === 'dummy-bookings') name = 'Dummy Bookings';
      if (segment === 'thank-you-conversion') name = 'Thank You';
      if (segment === 'terms-and-condition') name = 'Terms & Conditions';
      if (segment === 'privacy-policy') name = 'Privacy Policy';
      
      itemListElements.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `${siteUrl}${cumulativePath}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElements
    };
  }, [pathname, siteUrl]);

  // Avoid rendering during prerender/build and duplicate breadcrumb for root-only path
  if (!isMounted || !breadcrumbSchema.itemListElement || breadcrumbSchema.itemListElement.length <= 1) {
    return null;
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema, null, 2)
      }}
    />
  );
}