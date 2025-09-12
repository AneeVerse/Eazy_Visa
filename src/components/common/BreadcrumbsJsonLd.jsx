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
    // Do not compute for root path
    if (!pathname || pathname === "/") {
      return [];
    }

    const segments = pathname.split("/").filter(Boolean);
    const elements = [];

    // Always include Home as the first breadcrumb
    elements.push({
      position: 1,
      name: "Home",
      item: siteUrl,
    });

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


