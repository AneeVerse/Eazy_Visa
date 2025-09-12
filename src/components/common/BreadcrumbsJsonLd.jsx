"use client";

import { useMemo } from "react";
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

  const siteUrl =
    (typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.NEXT_PUBLIC_SITE_URL) || "https://www.eazyvisas.com";

  const itemListElements = useMemo(() => {
    // Do not render breadcrumbs on the root path
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

  if (!itemListElements.length) return null;

  return <BreadcrumbJsonLd itemListElements={itemListElements} />;
}


