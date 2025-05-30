import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2024-03-19', // Use today's date or your preferred version
  useCdn: process.env.NODE_ENV === 'production',
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a helper function for generating Image URLs with only the asset reference data in your documents
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

// Helper function to fetch all blog posts
export async function getAllBlogs() {
  return await sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        title
      },
      author->{
        name,
        image
      },
      body
    }`
  );
}

// Helper function to fetch a single blog post by slug
export async function getBlogBySlug(slug) {
  return await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        title
      },
      author->{
        name,
        image,
        bio
      },
      body
    }`,
    { slug }
  );
}

// Helper function to fetch related blog posts
export async function getRelatedBlogs(currentSlug, limit = 3) {
  return await sanityClient.fetch(
    `*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      categories[]->{
        title
      }
    }`,
    { currentSlug, limit }
  );
} 