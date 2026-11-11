"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "../cards/BlogCard";

export default function BlogSection({ initialBlogs = [] }) {
  const [blogData, setBlogData] = useState(initialBlogs);
  const [loading, setLoading] = useState(!initialBlogs || initialBlogs.length === 0);

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogData(initialBlogs);
      setLoading(false);
      return;
    }

    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogData(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch blogs from API route");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [initialBlogs]);

  if (loading) {
    return (
      <section className="pt-8 md:pt-16">
        <Layout>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">BLOGS</h2>
            <Button variant="primary" icon={<IoIosArrowForward />} size="medium" href="/blogs">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] xl:gap-[15px]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        </Layout>
      </section>
    );
  }

  if (!blogData || blogData.length === 0) {
    return null;
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
                url={post.slug?.current || post.slug}
                category={post.categories?.[0]?.title || ''}
                description={post.excerpt}
                imageUrl={post.mainImage}
                date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''}
              />
            ))}
          </div>
        </div>
      </Layout>
    </section>
  );
}
