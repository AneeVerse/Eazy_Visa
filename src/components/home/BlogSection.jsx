"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Layout from "../common/Layout";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-16 ">
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

        {/* Blog Cards - Scrollable */}
        <div className="relative mt-8">

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth snap-x"
          >
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="snap-center w-[250px]  sm:w-80 shrink-0 my-2"
              >
                <div className="relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={320}
                    height={180}
                    className="w-full h-48 object-cover rounded-4xl"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-1 justify-between">
                    {" "}
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <div className=" bg-[#ffd11b] text-black px-2 py-1 rounded-full flex items-center gap-1 font-semibold text-sm">
                      <FaStar className="text-black text-sm" />
                      {blog.rating}
                    </div>
                  </div>
                  <p className="text-gray-500">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Buttons (Hidden on Small Screens) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 transform -translate-y-[100%] cursor-pointer z-10 bg-white p-2  shadow-lg rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute z-10 -right-6 top-1/2 transform -translate-y-[100%] p-2 bg-white shadow-lg cursor-pointer rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </Layout>
    </section>
  );
}
