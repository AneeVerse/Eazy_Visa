"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { IoIosArrowForward } from "react-icons/io";

const blogs = [
  {
    title: "Burj Khalifa",
    location: "Dubai",
    description: "Where dreams touch the sky.",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    rating: "4.5",
  },
  {
    title: "Paris - Eiffel Tower",
    location: "Paris",
    description: "The city of love and lights.",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    rating: "4.5",
  },
  {
    title: "India - Agra",
    location: "Agra",
    description: "A land of unity in diversity.",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    rating: "4.5",
  },
  {
    title: "Dubai - Burj Khalifa",
    location: "Dubai",
    description: "Where dreams touch the sky.",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    rating: "4.5",
  },
];

export default function BlogSection() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] hide-scrollbar">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="w-full  my-2"
              >
                <div className="relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={320}
                    height={180}
                    className="w-full h-52 md:h-48 object-cover rounded-4xl"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-1 justify-between">
                    <h3 className="text-lg line-clamp-1 font-semibold">{blog.title}</h3>
                    <div className="bg-[#ffd11b] text-black px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap font-semibold text-sm">
                      <FaStar className="text-black text-sm" />
                      {blog.rating}
                    </div>
                  </div>
                  <p className="text-gray-500">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </section>
  );
}