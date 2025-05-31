"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "../cards/BlogCard";
import { getAllBlogs } from "../../lib/sanity";

// const blogs = [
//   {
//     title: "Burj Khalifa",
//     location: "Dubai",
//     description: "Where dreams touch the sky.",
//     image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
//     rating: "4.5",
//   },
//   {
//     title: "Paris - Eiffel Tower",
//     location: "Paris",
//     description: "The city of love and lights.",
//     image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
//     rating: "4.5",
//   },
//   {
//     title: "India - Agra",
//     location: "Agra",
//     description: "A land of unity in diversity.",
//     image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
//     rating: "4.5",
//   },
//   {
//     title: "Dubai - Burj Khalifa",
//     location: "Dubai",
//     description: "Where dreams touch the sky.",
//     image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
//     rating: "4.5",
//   },
// ];

export default function BlogSection() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await getAllBlogs();
        setBlogData(blogs);
      } catch (error) {
        console.error("Error fetching blogs from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blogData || blogData.length === 0) {
    return <p>No blogs found.</p>;
  }

  return (
    <section className="pt-8 md:pt-16">
      <Layout className="">
        {/* Title Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
            BLOGS
          </h2>

          <Button 
            variant="primary" 
            icon={<IoIosArrowForward />} 
            size="medium" 
            href="/blogs"
          >
            View All
          </Button>
        </div>

        {/* Blog Cards - Scrollable */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] xl:gap-[15px] hide-scrollbar">
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
        </div>
      </Layout>
    </section>
  );
}