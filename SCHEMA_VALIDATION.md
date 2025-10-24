# SEO Schema Validation Guide

## Overview
This document provides instructions for validating the structured data implementation in the Easy Visa website.

## Implemented Schema Types

### 1. Organization/LocalBusiness Schema
- **Location**: `src/components/seo/OrganizationSchema.jsx`
- **Integrated in**: `src/app/layout.js` (global)
- **Schema Types**: Organization, LocalBusiness
- **Key Features**:
  - Complete business information (address, phone, email)
  - Service catalog with visa services
  - Geographic coordinates
  - Contact points and opening hours
  - Aggregate rating and knowledge areas

### 2. BreadcrumbList Schema
- **Location**: `src/components/seo/BreadcrumbSchema.jsx`
- **Integrated in**: `src/app/layout.js` (global)
- **Features**:
  - Dynamic breadcrumb generation based on URL path
  - Custom naming for specific routes
  - Proper position indexing
  - Client-side rendering with hydration safety

### 3. BlogPosting Schema
- **Location**: `src/components/seo/BlogSchema.jsx`
- **Integrated in**: Blog post pages (`src/app/(home)/(dynamic)/blogs/[slug]/page.js`)
- **Features**:
  - Dynamic data from Sanity CMS
  - Author information with social links
  - Reading time calculation
  - Article metadata (word count, categories, keywords)
  - Publisher information

### 4. FAQPage Schema
- **Location**: `src/components/seo/FAQSchema.jsx`
- **Integrated in**: Blog post pages (when FAQ data exists)
- **Features**:
  - Dynamic FAQ data from Sanity
  - Question and answer pairs
  - Simulated engagement metrics
  - Publisher and audience information

## Validation Steps

### 1. Google Rich Results Test
Test each schema type using Google's Rich Results Test tool:
- **URL**: https://search.google.com/test/rich-results
- **Test URLs**:
  - Homepage: `https://www.eazyvisas.com/` (Organization + Breadcrumb)
  - Blog post: `https://www.eazyvisas.com/blogs/[any-slug]` (BlogPosting + FAQ + Breadcrumb)
  - Any page: Test breadcrumb functionality

### 2. Schema Markup Validator
Use Schema.org's validator:
- **URL**: https://validator.schema.org/
- Paste the JSON-LD output from each component

### 3. Google Search Console
Monitor structured data in Google Search Console:
- Check for errors in the "Enhancements" section
- Monitor rich results performance
- Verify indexing status

## Testing Checklist

### Organization Schema ✅
- [ ] Business name and description
- [ ] Complete address with postal code
- [ ] Phone number and email
- [ ] Geographic coordinates
- [ ] Service catalog
- [ ] Contact points
- [ ] Opening hours
- [ ] Social media links

### Breadcrumb Schema ✅
- [ ] Proper hierarchy structure
- [ ] Correct position indexing
- [ ] Valid URLs for each breadcrumb item
- [ ] Custom naming for special routes
- [ ] No duplicate breadcrumbs on homepage

### BlogPosting Schema ✅
- [ ] Article headline and description
- [ ] Author information
- [ ] Publication and modification dates
- [ ] Main image with proper dimensions
- [ ] Publisher information
- [ ] Article section and keywords
- [ ] Reading time calculation
- [ ] Word count

### FAQPage Schema ✅
- [ ] Question and answer pairs
- [ ] Proper text extraction from Sanity blocks
- [ ] Author and publisher information
- [ ] Page context and audience
- [ ] Only renders when FAQ data exists

## Common Issues and Solutions

### 1. Missing Required Properties
- Ensure all required schema properties are present
- Check for null/undefined values in Sanity data

### 2. Invalid Date Formats
- Use ISO 8601 format for all dates
- Validate publishedAt and _updatedAt from Sanity

### 3. Image URL Issues
- Ensure all image URLs are absolute
- Verify Sanity image transformations work correctly

### 4. Duplicate Schema
- Remove old inline JSON-LD scripts
- Ensure only one schema of each type per page

## Performance Considerations

- All schemas use Next.js `Script` component with proper loading strategy
- Client-side components use `"use client"` directive
- Breadcrumb schema includes hydration safety checks
- Minimal JavaScript footprint for SEO components

## Maintenance

### Regular Checks
1. Validate schemas monthly using Google Rich Results Test
2. Monitor Google Search Console for structured data errors
3. Update schema data when business information changes
4. Test new blog posts for proper schema generation

### Updates
- Keep schema markup aligned with Google's latest guidelines
- Update service catalog in OrganizationSchema as services change
- Maintain consistency between schema data and actual page content

## Resources

- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)