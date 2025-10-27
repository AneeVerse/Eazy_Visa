"use client";

import Script from 'next/script';

export default function BlogSchema({ post }) {
  if (!post) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eazyvisas.com";
  
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

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (text) => {
    const wordCount = text.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    return `PT${readingTimeMinutes}M`;
  };

  const bodyText = extractTextFromBlocks(post.body);
  const wordCount = bodyText.split(/\s+/).length;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "name": post.title,
    "description": post.metaDescription || post.title,
    "url": `${siteUrl}/blogs/${post.slug?.current}`,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Easy Visa Team",
      "url": post.author?.slug?.current ? `${siteUrl}/author/${post.author.slug.current}` : `${siteUrl}`,
      ...(post.author?.image && {
        "image": {
          "@type": "ImageObject",
          
          "width": 400,
          "height": 400
        }
      }),
      ...(post.author?.bio && {
        "description": post.author.bio
      }),
      ...(post.author?.socialLinks && {
        "sameAs": [
          ...(post.author.socialLinks.twitter ? [post.author.socialLinks.twitter] : []),
          ...(post.author.socialLinks.linkedin ? [post.author.socialLinks.linkedin] : [])
        ].filter(Boolean)
      })
    },
    "publisher": {
      "@type": "Organization",
      "name": "Easy Visa",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo/main-logo.png`,
        "width": 200,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${post.slug?.current}`
    },
    ...(post.mainImage && {
      "image": {
        "@type": "ImageObject",
      
        "width": 1200,
        "height": 630,
        "caption": post.title
      }
    }),
    "articleSection": post.categories?.map(cat => cat.title).join(", ") || "Visa Services",
    "keywords": [
      ...(post.categories?.map(cat => cat.title) || []),
      "visa services",
      "immigration",
      "travel documentation"
    ].join(", "),
    "wordCount": wordCount,
    "timeRequired": calculateReadingTime(bodyText),
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };

  return (
    <Script
      id="blog-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogSchema, null, 2)
      }}
    />
  );
}