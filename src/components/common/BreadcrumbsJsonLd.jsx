"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbJsonLd } from "next-seo";

function toTitleCase(input) {
  const decoded = decodeURIComponent(input || "");
  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function BreadcrumbsJsonLd() {
  const pathname = usePathname() || "/";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const siteUrl =
    (typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.NEXT_PUBLIC_SITE_URL) || "https://www.eazyvisas.com";

  const itemListElements = useMemo(() => {
    // Build from path segments; include Home always
    const segments = pathname.split("/").filter(Boolean);
    const elements = [];

    elements.push({
      position: 1,
      name: "Home",
      item: siteUrl,
    });

    // If root path, return only Home
    if (!segments.length) {
      return elements;
    }

    let cumulativePath = "";
    segments.forEach((segment, index) => {
      cumulativePath += `/${segment}`;
      elements.push({
        position: index + 2,
        name: toTitleCase(segment),
        item: `${siteUrl}${cumulativePath}`,
      });
    });

    return elements;
  }, [pathname, siteUrl]);

  // Avoid rendering during prerender/build and duplicate breadcrumb for root-only path
  if (!isMounted || !itemListElements.length) return null;

  return (
    <BreadcrumbJsonLd
      useAppDir
      itemListElements={itemListElements}
    />
  );
}


