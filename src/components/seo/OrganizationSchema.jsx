"use client";

import Script from 'next/script';

export default function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Easy Visa",
    "alternateName": "Eazyvisas",
    "description": "Easy visa offers a range of visa consulting services to businesses, families and individuals. We partner with our clients from start to finish, focusing on their needs while developing effective strategies and solutions.",
    "url": "https://www.eazyvisas.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.eazyvisas.com/logo/main-logo.png",
      "width": 200,
      "height": 60
    },
    "telephone": "+91 88501 46905",
    "email": "info@eazyvisas.com",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "61, CITI TOWER, SECTOR 15, CBD BELAPUR",
      "addressLocality": "NAVI MUMBAI",
      "addressRegion": "MAHARASHTRA",
      "postalCode": "400614",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0176",
      "longitude": "73.0286"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Global"
      }
    ],
    "serviceType": [
      "Visa Consulting Services",
      "Immigration Services",
      "Travel Documentation",
      "Visa Application Processing",
      "Business Visa Services",
      "Tourist Visa Services",
      "Student Visa Services"
    ],
    "priceRange": "$$",
    "currenciesAccepted": ["INR", "USD"],
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
    "openingHours": "Mo-Sa 09:00-18:00",
    "sameAs": [
      "https://www.instagram.com/eazyvisas/?__pwa=1",
      "https://www.eazyvisas.com"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 88501 46905",
        "contactType": "customer service",
        "email": "info@eazyvisas.com",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Visa Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tourist Visa Services",
            "description": "Complete tourist visa application and processing services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Visa Services",
            "description": "Business visa consultation and application services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Student Visa Services",
            "description": "Student visa guidance and application processing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dummy Flight Booking",
            "description": "Temporary flight reservations for visa applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dummy Hotel Booking",
            "description": "Temporary hotel reservations for visa applications"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "knowsAbout": [
      "Visa Requirements",
      "Immigration Law",
      "Travel Documentation",
      "Schengen Visa",
      "Dubai Visa",
      "US Visa",
      "UK Visa",
      "Canada Visa"
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData, null, 2)
      }}
    />
  );
}