"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Layout from "../common/Layout";

const destinations = [
  {
    id: 1,
    country: "United Arab Emirates",
    price: "₹6,500",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    visas: "53K+ Visas on Time",
  },
  {
    id: 2,
    country: "Japan",
    price: "₹2,340",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    visas: "21K+ Visas on Time",
    trending: true,
  },
  {
    id: 3,
    country: "Singapore",
    price: "₹3,200",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    visas: "11K+ Visas on Time",
  },
  {
    id: 4,
    country: "Vietnam",
    price: "₹2,150",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    visas: "27K+ Visas on Time",
  },
  {
    id: 5,
    country: "Germany",
    price: "₹4,700",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    visas: "25K+ Visas on Time",
  },
];

export default function DestinationSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Scroll distance
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <Layout className=" relative">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            <span className="text-blue-600 uppercase text-sm font-medium">Countries</span> <br />
            Explore top destinations
          </h2>
          <button className="hidden md:block text-blue-500 hover:underline">See All →</button>
        </div>

        {/* Scroll Buttons (Only for large screens) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute cursor-pointer left-0 top-1/2 transform z-10 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute cursor-pointer right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar py-4"
        >
          {destinations.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] md:min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.country}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  {item.visas}
                </span>
                {item.trending && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    🔥 Trending
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">Sticker Visa</p>
                <h3 className="text-lg font-semibold text-gray-900">{item.country}</h3>
                <p className="text-md font-bold text-gray-800">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </section>
  );
}
