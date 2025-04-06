"use client";
import BlogCard from "@/components/cards/BlogCard";
import SubscribeForm from "@/components/blog/SubscribeForm";
// import { blogData } from "@/data/blogData";
import { useEffect, useState } from "react";


const BlogPage = () => {
const [blogData, setBlogData] = useState([]);
useEffect(() => {
  // Simulate fetching data from an API
  const fetchData = async () => {
    // Replace this with your actual data fetching logic
    const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_URL}/api/blogs?populate=*`);
    const data = await response.json();
    console.log("API Data:", data.data);
    setBlogData(data.data);
  };
  fetchData();
}
, []);

if (blogData.length === 0) {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Loading...</p>
    </div>
  );
}
  // Simulate fetching data from an API
  // Replace this with your actual data fetching logic
  // const fetchData = async () => {

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blog Posts Column - Takes 3/4 width on large screens */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>

        {/* Subscribe Form Column - Takes 1/4 width on large screens */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 h-fit"> {/* Adjust top value to match your navbar height */}
            <SubscribeForm />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
