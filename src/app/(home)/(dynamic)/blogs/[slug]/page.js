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

export const revalidate = 60;

const components = {
  types: {
    table: TableBlock,
  },
};

export async function generateMetadata({ params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [urlFor(post.mainImage).url()],
    },
  };
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