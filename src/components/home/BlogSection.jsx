"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Layout from "../common/Layout";

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
    <section className="py-16">
      <Layout className="">
        {/* Title Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
            BLOGS
          </h2>
          <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition">
            View All Stories
          </button>
        </div>

        {/* Blog Cards - Grid Layout */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className=" overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-4xl"
                  />
                </div>
                <div className="py-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <div className="bg-[#ffd11b] text-black px-2 py-1 rounded-full flex items-center gap-1 font-semibold text-sm">
                      <FaStar className="text-black text-sm" />
                      {blog.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 mt-2">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </section>
  );
}