# Blog UI Implementation Guide - Red Color Palette

This guide provides a complete blueprint for implementing a modern, responsive blog system with a red color palette, based on the Easy Visa blog structure and components.

## 🎨 Color Palette (Red Theme)

Replace the existing blue color scheme with this red palette:

```css
/* Tailwind Config - Red Color Palette */
colors: {
  primary: {
    DEFAULT: '#DC2626', // Red-600
    50: '#FEF2F2',      // Lightest red
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',     // Red-500
    600: '#DC2626',     // Base red
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',     // Darkest red
  },
  accent: {
    DEFAULT: '#F59E0B',  // Keep amber for contrast
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  }
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (home)/
│   │   └── (dynamic)/
│   │       └── blogs/
│   │           ├── page.js              # Blog listing page
│   │           └── [slug]/
│   │               └── page.js          # Individual blog post
│   └── api/
│       └── blog-contact/
│           └── route.js                 # Contact form API
├── components/
│   ├── blog/
│   │   ├── FAQAccordion.jsx            # FAQ component
│   │   ├── NewsLetter.jsx              # Newsletter subscription
│   │   ├── RelatedBlogs.jsx            # Related posts sidebar
│   │   ├── SubscribeForm.jsx           # Contact/Subscribe form
│   │   └── TableBlock.jsx              # Table component for content
│   ├── cards/
│   │   └── BlogCard.jsx                # Blog post card component
│   └── seo/
│       ├── BlogSchema.jsx              # SEO structured data
│       └── FAQSchema.jsx               # FAQ structured data
└── lib/
    └── sanity.js                       # Sanity CMS integration
```

## 🎯 Core Components

### 1. BlogCard Component (Red Theme)

```jsx
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanity";

const BlogCard = ({ title, url, category, description, imageUrl, date }) => {
  return (
    <Link
      href={`/blogs/${url}`}
      className="bg-white rounded-2xl group shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-red-50"
    >
      <div className="relative overflow-hidden h-48">
        <Image
          src={urlFor(imageUrl).url()}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 duration-300 transition-all"
        />
        {/* Red overlay on hover */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-300"></div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
            {category?.toUpperCase() || 'BLOG'}
          </p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
```

### 2. Blog Listing Page

```jsx
import BlogCard from "../../../../components/cards/BlogCard";
import SubscribeForm from "../../../../components/blog/SubscribeForm";
import { getAllBlogs } from "../../../../lib/sanity";

export const revalidate = 60;

async function BlogPage() {
  const blogData = await getAllBlogs();

  if (!blogData || blogData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-xl text-gray-600">No blog posts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our <span className="text-red-600">Blog</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover insights, tips, and stories from our experts
        </p>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blog Posts Column - Takes 3/4 width on large screens */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                url={post.slug.current}
                category={post.categories?.[0]?.title}
                description={post.excerpt}
                imageUrl={post.mainImage}
                date={new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
            ))}
          </div>
        </div>

        {/* Subscribe Form Column - Takes 1/4 width on large screens */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 h-fit">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
```

### 3. Individual Blog Post Page Structure

```jsx
import Image from "next/image";
import SubscribeForm from "../../../../../components/blog/SubscribeForm";
import RelatedBlogs from "../../../../../components/blog/RelatedBlogs";
import Layout from "../../../../../components/common/Layout";
import { getBlogBySlug, getRelatedBlogs, urlFor } from "../../../../../lib/sanity";
import { PortableText } from '@portabletext/react';
import TableBlock from '../../../../../components/blog/TableBlock';
import FAQAccordion from '../../../../../components/blog/FAQAccordion';
import BlogSchema from '../../../../../components/seo/BlogSchema';

export const revalidate = 60;

const components = {
  types: {
    table: TableBlock,
  },
};

async function BlogDetailsPage({ params }) {
  const post = await getBlogBySlug(params.slug);
  const relatedPosts = await getRelatedBlogs(params.slug);

  if (!post) {
    return (
      <Layout className="py-12">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Blog post not found</h1>
          <p className="mt-4 text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="py-12">
      {/* Structured Data */}
      <BlogSchema post={post} />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-8 xl:col-span-9">
          {/* Blog Meta */}
          <div className="mb-8">
            {/* Featured Image */}
            <div className="relative w-full h-[280px] md:h-[420px] mb-6 rounded-xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              {/* Red gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent"></div>
            </div>

            {/* Date and Reading Time */}
            <div className="flex items-center text-[14px] mb-3 text-gray-500">
              <svg className="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Posted on {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Author and Categories */}
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <div className="flex items-center text-gray-600">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-red-600 font-semibold text-xs">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span>By {post.author.name}</span>
              </div>
              {post.categories?.map((category) => (
                <span key={category.title} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  {category.title}
                </span>
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-red-600 prose-strong:text-gray-900">
            <PortableText value={post.body} components={components} />
          </div>

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && <FAQAccordion faq={post.faq} />}
        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-8">
            {/* Subscribe Form */}
            <SubscribeForm />
            
            {/* Related Blogs */}
            <RelatedBlogs posts={relatedPosts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetailsPage;
```

### 4. SubscribeForm Component (Red Theme)

```jsx
"use client";

import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiUser, BiEnvelope, BiPhone } from 'react-icons/bi';

const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/blog-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Thank you! We\'ll be in touch soon.');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-50">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <BiEnvelope className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Get In Touch</h3>
        <p className="text-gray-600 text-sm mt-1">Let's discuss your requirements</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              required
            />
          </div>
          <div className="relative">
            <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              required
            />
          </div>
        </div>

        <div className="relative">
          <BiEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            required
          />
        </div>

        <div className="relative">
          <BiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            required
          />
        </div>

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
          required
        >
          <option value="">Select Service</option>
          <option value="consultation">Consultation</option>
          <option value="visa-assistance">Visa Assistance</option>
          <option value="document-review">Document Review</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default SubscribeForm;
```

### 5. RelatedBlogs Component (Red Theme)

```jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FiClock, FiBookmark } from "react-icons/fi";
import { urlFor } from "../../lib/sanity";

const RelatedBlogs = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-50">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          Related Articles
          <span className="block w-8 h-1 bg-gradient-to-r from-red-400 to-red-600 mt-1 rounded-full"></span>
        </h3>
        <FiBookmark className="text-red-400 w-5 h-5" />
      </div>
      
      <div className="space-y-5">
        {posts.map((post) => (
          <Link 
            key={post._id} 
            href={`/blogs/${post.slug.current}`}
            className="group flex gap-4 items-start p-2 -mx-2 rounded-lg hover:bg-red-50/50 transition-colors duration-200"
          >
            <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
              <img 
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent"></div>
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
              <h4 className="text-[15px] font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
              <div className="flex items-center mt-2 space-x-3">
                <span className="inline-flex items-center text-xs text-gray-500">
                  <FiClock className="mr-1 w-3 h-3 opacity-80" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;
```

### 6. FAQAccordion Component (Red Theme)

```jsx
"use client";
import React, { useState } from "react";

export default function FAQAccordion({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Frequently Asked <span className="text-red-600">Questions</span>
      </h2>
      <div className="space-y-4">
        {faq.map((item, idx) => (
          <div key={idx} className="border border-red-100 rounded-lg bg-red-50/30 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-6 py-4 focus:outline-none hover:bg-red-50/50 transition-colors"
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="font-semibold text-lg text-left text-gray-900">
                Q: {item.question}
              </span>
              <span 
                className="ml-4 text-2xl text-red-600 transition-transform duration-200 flex-shrink-0" 
                style={{ transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                +
              </span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-gray-700 bg-white border-t border-red-100">
                <div className="pt-4">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔧 API Integration

### Blog Contact API Route

```javascript
import nodemailer from 'nodemailer';

export const POST = async (req) => {
  try {
    const formData = await req.json();
    const { firstName, lastName, email, phone, service } = formData;
    
    const name = `${firstName || ''} ${lastName || ''}`.trim();

    // Validation
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'All fields are required!'
        }),
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Please enter a valid email address'
        }),
        { status: 400 }
      );
    }

    // Configure nodemailer (replace with your SMTP settings)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Blog Contact Form Submission - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #DC2626, #B91C1C); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #DC2626;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Thank you for your message. We\'ll be in touch soon!'
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Blog contact form error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'Server error. Please try again later.'
      }),
      { status: 500 }
    );
  }
};
```

## 📱 Responsive Design Features

### Mobile-First Approach
- Grid layouts that stack on mobile
- Touch-friendly button sizes (minimum 44px)
- Optimized image loading with Next.js Image component
- Sticky sidebar on desktop, stacked on mobile

### Key Responsive Classes
```css
/* Blog listing grid */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

/* Main content layout */
grid-cols-1 lg:grid-cols-12

/* Form inputs */
grid-cols-1 sm:grid-cols-2

/* Typography scaling */
text-3xl md:text-4xl
```

## 🎨 Custom CSS Classes (Red Theme)

Add these to your `globals.css`:

```css
@layer components {
  .blog-content {
    @apply prose prose-lg max-w-none;
    @apply prose-headings:text-gray-900;
    @apply prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline;
    @apply prose-strong:text-gray-900;
    @apply prose-code:text-red-600 prose-code:bg-red-50;
    @apply prose-blockquote:border-red-200 prose-blockquote:bg-red-50/50;
  }

  .red-gradient {
    @apply bg-gradient-to-r from-red-500 to-red-600;
  }

  .red-shadow {
    box-shadow: 0 4px 14px 0 rgba(220, 38, 38, 0.15);
  }

  .red-shadow-lg {
    box-shadow: 0 10px 25px -3px rgba(220, 38, 38, 0.1), 0 4px 6px -2px rgba(220, 38, 38, 0.05);
  }
}
```

## 🔍 SEO Implementation

### BlogSchema Component
- Structured data for better search visibility
- Open Graph meta tags
- Twitter Card support
- Canonical URLs
- Reading time calculation

### Key SEO Features
- Dynamic meta titles and descriptions
- Image optimization with alt tags
- Semantic HTML structure
- Schema.org markup for articles
- FAQ schema for rich snippets

## 📦 Required Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@portabletext/react": "^3.0.0",
    "@sanity/client": "^6.0.0",
    "@sanity/image-url": "^1.0.0",
    "react-icons": "^4.0.0",
    "react-toastify": "^9.0.0",
    "framer-motion": "^10.0.0",
    "nodemailer": "^6.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "@tailwindcss/forms": "^0.5.0"
  }
}
```

## 🚀 Implementation Steps

1. **Setup Project Structure**: Create the folder structure as outlined above
2. **Install Dependencies**: Run `npm install` with the required packages
3. **Configure Tailwind**: Update `tailwind.config.js` with the red color palette
4. **Create Components**: Implement each component with the red theme
5. **Setup API Routes**: Configure the blog contact API endpoint
6. **Configure Sanity**: Set up Sanity CMS integration (if using)
7. **Add SEO Components**: Implement structured data and meta tags
8. **Test Responsiveness**: Ensure all components work across devices
9. **Optimize Performance**: Add image optimization and lazy loading

## 🎯 Key Features

- **Modern Design**: Clean, professional layout with red accent colors
- **Fully Responsive**: Works perfectly on all device sizes
- **SEO Optimized**: Built-in structured data and meta tag management
- **Performance Focused**: Optimized images and efficient loading
- **Accessible**: ARIA labels and keyboard navigation support
- **Interactive Elements**: Smooth animations and hover effects
- **Contact Integration**: Built-in contact forms with email notifications

This guide provides everything needed to recreate the blog UI with a beautiful red color scheme while maintaining all the functionality and modern design patterns of the original implementation.