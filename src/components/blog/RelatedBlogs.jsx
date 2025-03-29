"use client";

import Link from "next/link";
import { blogData } from "@/data/blogData";
import { useState, useEffect } from "react";
import { FiClock, FiBookmark } from "react-icons/fi";

const RelatedBlogsSidebar = ({ currentBlogSlug }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const currentBlog = blogData.find(blog => blog.url === currentBlogSlug);
    
    if (currentBlog) {
      const related = blogData
        .filter(blog => blog.url !== currentBlogSlug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        
      setRelatedBlogs(related);
    }
  }, [currentBlogSlug]);

  if (relatedBlogs.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          Recommended Reads
          <span className="block w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mt-1 rounded-full"></span>
        </h3>
        <FiBookmark className="text-gray-400 w-5 h-5  transition-colors" />
      </div>
      
      <div className="space-y-5">
        {relatedBlogs.map((blog) => (
          <Link 
            key={blog.url} 
            href={`/blogs/${blog.url}`}
            className="group flex gap-4 items-start p-2 -mx-2 rounded-lg hover:bg-gray-50/80 transition-colors duration-200"
          >
            <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <img 
                src={blog.imageUrl}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
              <h4 className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {blog.title}
              </h4>
              <div className="flex items-center mt-2 space-x-3">
                <span className="inline-flex items-center text-xs text-gray-500">
                  <FiClock className="mr-1 w-3 h-3 opacity-80" />
                  {blog.date}
                </span>
                {/* <span className="inline-block px-2 py-1 text-[11px] font-medium bg-blue-50/70 text-blue-600 rounded-full backdrop-blur-sm">
                  {blog.category}
                </span> */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100/70">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
        >
          Explore more articles
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RelatedBlogsSidebar;