"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Layout from "../common/Layout";
import VisaCard from "../cards/VisaCard";
import { countryData } from "@/data/countryData";
import Button from "../common/Button";
import { FiArrowRight } from "react-icons/fi";
import { Heading, Subheading } from "../common/Typography";

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
    <section className="py-16 ">
      <Layout className=" relative">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Subheading className="text-primary-500 mb-2">Countries</Subheading>
            <Heading level={2} className="text-secondary-500 mb-10">
              Explore top destinations
            </Heading>
          </div>
        

          <Button
            variant="primary"
            icon={<IoIosArrowForward />}
            size="medium"
            href={"#"}
          >
            See All
          </Button>
        </div>

        {/* Scroll Buttons (Only for large screens) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute cursor-pointer left-8 lg:left-15 top-1/2 transform z-10 translate-y-[100%] bg-white/50 hover:bg-white transition-all shadow-lg p-2 rounded-full"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute cursor-pointer right-8  lg:right-15 top-1/2 z-10 transform translate-y-[100%] bg-white/50 hover:bg-white transition-all shadow-lg p-2 rounded-full"
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
