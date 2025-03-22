"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Layout from "../common/Layout";
import VisaCard from "../cards/VisaCard";
import { countryData } from "@/data/countryData";



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
            <span className=" text-blue-600 uppercase text-sm font-medium">Countries</span> <br />
            Explore top destinations
          </h2>
          <button className="hidden bg-blue-200 px-5 rounded-full font-medium py-[7px] cursor-pointer md:flex items-center text-blue-500 gap-1">See All 
            <IoIosArrowForward className="inline-block" />
          </button>
        </div>

        {/* Scroll Buttons (Only for large screens) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute cursor-pointer left-0 top-1/2 transform z-10 translate-y-1/2 bg-white shadow-lg p-2 rounded-full"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute cursor-pointer right-0 top-1/2 z-10 transform translate-y-1/2 bg-white shadow-lg p-2 rounded-full"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-4 hide-scrollbar overflow-x-auto scroll-smooth  py-4"
        >
          {countryData.map((country) => (
             <VisaCard key={country.id} {...country} />
          ))}
        </div>
      </Layout>
    </section>
  );
}
