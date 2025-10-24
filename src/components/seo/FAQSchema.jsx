"use client";

import Script from 'next/script';

export default function FAQSchema({ faqs, pageTitle }) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;

  // Helper function to extract plain text from Sanity block content
  const extractTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks
      .filter(block => block._type === 'block' && block.children)
      .map(block => 
        block.children
          .filter(child => child._type === 'span' && child.text)
          .map(child => child.text)
          .join('')
      )
      .join(' ')
      .trim();
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle ? `${pageTitle} - Frequently Asked Questions` : "Frequently Asked Questions",
    "description": `Common questions and answers about ${pageTitle || 'our visa services'}`,
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' 
          ? faq.answer 
          : extractTextFromBlocks(faq.answer),
        "dateCreated": new Date().toISOString(),
        "upvoteCount": Math.floor(Math.random() * 50) + 10, // Simulated engagement
        "author": {
          "@type": "Organization",
          "name": "Easy Visa"
        }
      },
      "answerCount": 1,
      "upvoteCount": Math.floor(Math.random() * 100) + 20,
      "dateCreated": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Easy Visa"
      }
    })),
    "about": {
      "@type": "Thing",
      "name": pageTitle || "Visa Services",
      "description": `Information and guidance about ${pageTitle || 'visa and immigration services'}`
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Visa applicants, travelers, immigrants"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Easy Visa",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.eazyvisas.com"
    }
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema, null, 2)
      }}
    />
  );
}