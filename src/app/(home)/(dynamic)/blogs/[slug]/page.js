// app/blog/[slug]/page.js
import Image from "next/image";
import SubscribeForm from "../../../../../components/blog/SubscribeForm";
import RelatedBlogs from "../../../../../components/blog/RelatedBlogs";
import Newsletter from "../../../../../components/blog/NewsLetter";
import Layout from "../../../../../components/common/Layout";
import FeedbackReviewComponent from "../../../../../components/home/FeedbackReviewComponent";
import { Heading } from "../../../../../components/common/Typography";
import { getBlogBySlug, getRelatedBlogs, urlFor } from "../../../../../lib/sanity";
import { PortableText } from '@portabletext/react';
import TableBlock from '../../../../../components/blog/TableBlock';
import { sanityClient } from "../../../../../lib/sanity";

export const revalidate = 60;

const components = {
  types: {
    table: TableBlock,
  },
};

// ✅ Generate Dynamic Metadata
export async function generateMetadata({ params }) {
  const slugParam = params.slug;
  // Fetch post data from Sanity
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "thumbnail": coalesce(mainImage.externalImage, mainImage.sanityImage.asset->url, mainImage.asset->url),
    "shortDescription": coalesce(shortDescription, excerpt, ""),
    "date": publishedAt,
    "timeToRead": timeToRead,
    "author": author->{name},
    "seo": {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogUrl,
      ogType,
      ogLocale,
      ogLocaleAlternate,
      ogSiteName,
      "ogImage": ogImage.asset->url,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      articlePublishedTime,
      articleModifiedTime,
      twitterCard,
      twitterTitle,
      twitterDescription,
      "twitterImage": twitterImage.asset->url,
      twitterAuthor,
      twitterLabel1,
      twitterData1,
      twitterLabel2,
      twitterData2,
      keywords,
      canonicalUrl,
      noIndex,
      msapplicationTileImage
    }
  }`;
  const post = await sanityClient.fetch(query, { slug: slugParam });
  if (!post) {
    return { title: "Blog | Aneeverse", description: "This blog post does not exist." };
  }

  // Helper to truncate description for SEO
  function truncate(str, n) {
    return (str && str.length > n) ? str.slice(0, n - 1) + "…" : str;
  }

  // Basic metadata
  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = truncate(post.shortDescription || post.seo?.metaDescription || "Read this article on Aneeverse.", 155);
  
  // Open Graph
  const ogTitle = metaTitle;
  const ogDescription = truncate(post.shortDescription || post.seo?.ogDescription || metaDescription, 155);
  const ogUrl = post.seo?.ogUrl || `https://aneeverse.com/blog/${post.slug}`;
  const ogType = post.seo?.ogType || 'article';
  const ogLocale = post.seo?.ogLocale || 'en_US';
  const ogLocaleAlternate = (post.seo?.ogLocaleAlternate && post.seo.ogLocaleAlternate.length > 0)
    ? post.seo.ogLocaleAlternate
    : [
        "en_US", "en_GB", "fr_FR", "de_DE", "es_ES", "it_IT", "pt_PT", "ru_RU", "zh_CN", "ja_JP", "ko_KR", "hi_IN"
      ];
  const ogSiteName = post.seo?.ogSiteName || 'Aneeverse';
  const ogImage = post.seo?.ogImage || post.thumbnail;

  // Twitter
  const twitterCard = post.seo?.twitterCard || 'summary_large_image';
  const twitterTitle = post.seo?.twitterTitle || ogTitle;
  const twitterDescription = post.seo?.twitterDescription || ogDescription;
  const twitterImage = post.seo?.twitterImage || ogImage;
  
  // Other SEO
  const keywords = post.seo?.keywords || [];
  const canonicalUrl = post.seo?.canonicalUrl || ogUrl;
  const publishedTime = post.seo?.articlePublishedTime || post.date;
  
  const metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      type: ogType,
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      siteName: ogSiteName,
      images: [
        { url: ogImage, width: post.seo?.ogImageWidth || 1200, height: post.seo?.ogImageHeight || 630, alt: post.title, type: post.seo?.ogImageType || 'image/webp' }
      ],
      article: { publishedTime, modifiedTime: post.seo?.articleModifiedTime, authors: [post.author.name] }
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
      creator: post.seo?.twitterAuthor || post.author.name
    },
    authors: [{ name: post.author.name }],
    other: {
      'twitter:label1': post.seo?.twitterLabel1 || 'Written by',
      'twitter:data1': post.seo?.twitterData1 || post.author.name,
      'twitter:label2': post.seo?.twitterLabel2 || 'Est. reading time',
      'twitter:data2': post.seo?.twitterData2 || `${post.timeToRead} minutes`,
      'msapplication-TileImage': post.seo?.msapplicationTileImage || ''
    },
    alternates: { canonical: canonicalUrl },
    robots: post.seo?.noIndex ? { index: false, follow: true } : undefined
  };
  
  return metadata;
}

async function BlogDetailsPage({ params }) {
  const post = await getBlogBySlug(params.slug);
  const relatedPosts = await getRelatedBlogs(params.slug);

  if (!post) {
    return (
      <Layout className="py-12">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Blog post not found</h1>
          <p className="mt-4 text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="py-12">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-8 xl:col-span-9">
          {/* Blog Meta */}
          <div className="mb-8">
            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-6">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>

            <div className="flex items-center text-[14px] mb-3 text-gray-400">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Posted on {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500">
              <span className="mr-4">By {post.author.name}</span>
              {post.categories?.map((category) => (
                <span key={category.title} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {category.title}
                </span>
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose blog-content max-w-none">
            <PortableText value={post.body} components={components} />
          </div>
          
          <FeedbackReviewComponent />
        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-8">
            {/* Subscribe Form */}
            <div className="">
              <SubscribeForm />
            </div>

            {/* Related Blogs */}
            <div className="">
              <RelatedBlogs posts={relatedPosts} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetailsPage;