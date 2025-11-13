# Sanity CMS Structure Guide

## 📋 Overview

This guide provides a comprehensive overview of the Sanity CMS structure used in the Easy Visa project. It includes all schemas, content types, configurations, and implementation details for managing blog content, authors, categories, tables, and FAQ sections.

## 🏗️ Project Structure

```
src/
├── schemas/
│   ├── index.js              # Schema exports
│   ├── post.js               # Blog post schema
│   ├── author.js             # Author schema
│   ├── category.js           # Category schema
│   ├── table.js              # Table schema
│   └── tableRow.js           # Table row schema
├── lib/
│   └── sanity.js             # Sanity client configuration
└── sanity.config.ts          # Sanity studio configuration
```

## 🔧 Sanity Configuration

### Main Configuration (`sanity.config.ts`)
```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemas'

export default defineConfig({
  name: 'default',
  title: 'Easy Visa Blog',
  projectId: 'your-project-id',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### Schema Index (`src/schemas/index.js`)
```javascript
import post from './post'
import author from './author'
import category from './category'
import table from './table'
import tableRow from './tableRow'

export const schemaTypes = [post, author, category, table, tableRow]
```

## 📝 Schema Definitions

### 1. Blog Post Schema (`post.js`)

**Document Type**: `post`
**Title**: Blog Post

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | string | ✅ | Blog post title |
| `slug` | slug | ✅ | URL slug (auto-generated from title) |
| `metaDescription` | text | ❌ | SEO meta description for search engines and Open Graph |
| `author` | reference | ❌ | Reference to author document |
| `mainImage` | image | ✅ | Featured image with hotspot |
| `categories` | array | ❌ | Array of category references |
| `publishedAt` | datetime | ✅ | Publication date and time |
| `body` | array | ✅ | Rich content body (blocks, images, tables) |
| `faq` | array | ❌ | FAQ section with questions and answers |

#### Body Content Types:
- **Block**: Rich text content with formatting
- **Image**: Images with alt text and hotspot
- **Table**: Structured table data

#### FAQ Structure:
```javascript
{
  name: 'faq',
  title: 'FAQ',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'question',
          title: 'Question',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'answer',
          title: 'Answer',
          type: 'text',
          validation: Rule => Rule.required()
        }
      ]
    }
  ]
}
```

### 2. Author Schema (`author.js`)

**Document Type**: `author`
**Title**: Author

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | string | ✅ | Author's full name |
| `slug` | slug | ✅ | URL slug for author page |
| `image` | image | ❌ | Author profile picture |
| `bio` | array | ❌ | Author biography (rich text) |
| `twitter` | string | ❌ | Twitter handle |
| `linkedin` | string | ❌ | LinkedIn profile URL |

### 3. Category Schema (`category.js`)

**Document Type**: `category`
**Title**: Category

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | string | ✅ | Category name |
| `description` | text | ❌ | Category description |
| `slug` | slug | ✅ | URL slug for category page |

### 4. Table Schema (`table.js`)

**Object Type**: `table`
**Title**: Table

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `header` | array | ❌ | Table header row (array of strings) |
| `rows` | array | ❌ | Table data rows (array of tableRow objects) |

### 5. Table Row Schema (`tableRow.js`)

**Object Type**: `tableRow`
**Title**: Table Row

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `cells` | array | ❌ | Row cells (array of strings) |

## 🎯 Content Types Available

### ✅ Currently Implemented:
- **Blog Posts** with rich content
- **Authors** with social links
- **Categories** for organization
- **Tables** for structured data
- **FAQ Sections** for Q&A content
- **Meta Descriptions** for SEO
- **Images** with alt text and hotspot

### ❌ Not Currently Implemented:
- **YouTube Embeds** - No schema or component exists
- **Video Embeds** - No schema or component exists
- **Custom Video Players** - Not implemented in Sanity

## 🔍 How to Check and Apply Content

### 1. Blog Post Content Verification

```javascript
// Check if post has required fields
const validatePost = (post) => {
  const checks = {
    hasTitle: !!post.title,
    hasSlug: !!post.slug?.current,
    hasMainImage: !!post.mainImage,
    hasPublishedAt: !!post.publishedAt,
    hasBody: !!post.body && post.body.length > 0,
    hasMetaDescription: !!post.metaDescription,
    hasFAQ: !!post.faq && post.faq.length > 0,
    hasAuthor: !!post.author,
    hasCategories: !!post.categories && post.categories.length > 0
  };
  
  return checks;
};
```

### 2. Table Content Verification

```javascript
// Check if body contains tables
const hasTableContent = (body) => {
  return body?.some(block => block._type === 'table');
};

// Extract table data
const extractTables = (body) => {
  return body?.filter(block => block._type === 'table') || [];
};
```

### 3. FAQ Content Verification

```javascript
// Check if post has FAQ section
const hasFAQContent = (post) => {
  return post.faq && post.faq.length > 0;
};

// Validate FAQ structure
const validateFAQ = (faq) => {
  return faq.every(item => 
    item.question && 
    item.answer && 
    item.question.trim() !== '' && 
    item.answer.trim() !== ''
  );
};
```

### 4. Meta Description Verification

```javascript
// Check meta description
const hasMetaDescription = (post) => {
  return post.metaDescription && post.metaDescription.trim() !== '';
};

// Validate meta description length (recommended 150-160 characters)
const validateMetaDescription = (metaDescription) => {
  const length = metaDescription?.length || 0;
  return {
    exists: length > 0,
    optimalLength: length >= 120 && length <= 160,
    tooShort: length < 120,
    tooLong: length > 160,
    length
  };
};
```

## 🏠 Homepage Blog Cards Structure

### BlogSection Component (`src/components/home/BlogSection.jsx`)

The homepage displays blog cards using the same <mcfile name="BlogCard.jsx" path="src/components/cards/BlogCard.jsx"></mcfile> component as the blog listing page.

#### Key Features:
- **Responsive Grid**: 1 column on mobile, 2 on tablet, 4 on desktop
- **Limited Display**: Shows only first 4 blog posts
- **Same Structure**: Uses identical BlogCard component
- **Data Fetching**: Uses `getAllBlogs()` from Sanity
- **Loading States**: Handles loading and empty states

#### Implementation:
```jsx
// Homepage blog section
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] xl:gap-[15px]">
  {blogData.slice(0, 4).map((post) => (
    <BlogCard
      key={post._id}
      title={post.title}
      url={post.slug.current}
      category={post.categories?.[0]?.title || ''}
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
```

## 📊 Sanity Client Configuration

### Client Setup (`src/lib/sanity.js`)

```javascript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)
```

### Common Queries

#### Get All Blogs
```javascript
export async function getAllBlogs() {
  return await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]-> {
        title,
        slug
      }
    }
  `)
}
```

#### Get Blog by Slug
```javascript
export async function getBlogBySlug(slug) {
  return await sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      metaDescription,
      mainImage,
      publishedAt,
      body,
      faq,
      author-> {
        name,
        slug,
        image,
        bio,
        twitter,
        linkedin
      },
      categories[]-> {
        title,
        slug
      }
    }
  `, { slug })
}
```

## 🚀 Adding New Content Types

### To Add YouTube Embed Support:

1. **Create YouTube Schema** (`src/schemas/youtube.js`):
```javascript
const youtube = {
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Video Title',
      type: 'string'
    }
  ]
}

export default youtube
```

2. **Add to Post Body**:
```javascript
// In post.js body field
{
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'image', options: { hotspot: true } },
    { type: 'table' },
    { type: 'youtube' } // Add this line
  ]
}
```

3. **Create YouTube Component**:
```jsx
// src/components/blog/YouTubeEmbed.jsx
const YouTubeEmbed = ({ value }) => {
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(value.url);
  
  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
};
```

## 🔧 Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## 📋 Content Checklist

### Before Publishing a Blog Post:

- [ ] **Title**: Clear and descriptive
- [ ] **Slug**: SEO-friendly URL
- [ ] **Meta Description**: 120-160 characters
- [ ] **Main Image**: High-quality featured image
- [ ] **Author**: Assigned author with complete profile
- [ ] **Categories**: At least one relevant category
- [ ] **Publication Date**: Set correctly
- [ ] **Body Content**: Rich content with proper formatting
- [ ] **Images**: All images have alt text
- [ ] **Tables**: Properly structured if used
- [ ] **FAQ Section**: Complete Q&A pairs if applicable

### Content Quality Checks:

- [ ] **SEO**: Meta description within optimal length
- [ ] **Images**: All images optimized and have alt text
- [ ] **Links**: All external links work correctly
- [ ] **Tables**: Data is accurate and well-formatted
- [ ] **FAQ**: Questions are clear and answers comprehensive
- [ ] **Categories**: Properly categorized for easy discovery

## 🎨 Styling Integration

The blog cards maintain consistent styling across:
- **Homepage**: 4-column grid on desktop
- **Blog Listing**: 3-column grid with sidebar
- **Individual Posts**: Full-width with sidebar

All components use the same <mcfile name="BlogCard.jsx" path="src/components/cards/BlogCard.jsx"></mcfile> for consistency.

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid depending on page
- **Sidebar**: Responsive positioning

This guide provides everything needed to understand, manage, and extend the Sanity CMS structure for the Easy Visa blog system.