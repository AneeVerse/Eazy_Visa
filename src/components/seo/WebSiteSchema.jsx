"use client";

import Script from 'next/script';

export default function WebSiteSchema() {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Eazy Visas",
        "alternateName": "Easy Visa",
        "url": "https://www.eazyvisas.com",
        "description": "Visa help made simple. Get document support, application guidance, and dummy flight tickets for visa (verified itinerary) - fast, clear pricing, no stress.",
        "publisher": {
            "@type": "Organization",
            "name": "Eazy Visas",
            "url": "https://www.eazyvisas.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.eazyvisas.com/logo/main-logo.png",
                "width": 200,
                "height": 60
            }
        },
        "inLanguage": "en-US"
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(websiteData, null, 2)
            }}
        />
    );
}
