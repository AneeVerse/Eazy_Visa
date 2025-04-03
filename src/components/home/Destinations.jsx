"use client";

import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Layout from "../common/Layout";
import VisaCard from "../cards/VisaCard";
import { mergeCountryData } from "@/utils/mergeCountryData";
import Button from "../common/Button";
import { FiArrowRight } from "react-icons/fi";
import { Heading, Subheading } from "../common/Typography";

export default function DestinationSlider() {
  const scrollRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // 1. Fetch from API
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLib-zX2S7i5qK5In1NK_6uNuuDCHXZg_Ob91mSseJOLe5mJs6Cmibo9NaksvRHTenjQKPfKrdpc_nnYGVDrDAfNKzSkdJ5OdfRoxNVqSO2NSTOismSN5N0Q-HIcthcSVqLchmFAeUSyStl9dR5K_wCTAS5IXKJCYhOc9Q3OV3tV4p_gDmOmnUEm8tXwgW3I99JOdHnIYm7d0jq8auQ26aQN-icz8e5cdmiUX9U41RUu6Nx_PT8pARbwXQsKv0us2Izgf-ptVxPIzOtmooFBAf_h9ffSKQ&lib=MNOr_3U-ifGUiHYeVYNtbhEhiku5JnKVW');
        const apiCountries = await response.json();
        
        // 2. Merge with local data
        const mergedCountries = mergeCountryData(apiCountries);
        setCountries(mergedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback to local data
        const allLocalCountries = Object.values(countryData).flat();
        setCountries(allLocalCountries);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  if (loading) {
    return <div className="py-16 text-center">Loading countries...</div>;
  }

  return (
    <section className="py-16">
      <Layout className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Subheading className="text-primary-500 tracking-wider uppercase mb-2">
              Countries
            </Subheading>
            <Heading level={2} className="text-secondary-500 mb-10">
              Explore top destinations
            </Heading>
          </div>
          
          <Button
            variant="primary"
            icon={<IoIosArrowForward />}
            size="medium"
            href={"/countries"}
          >
            See All
          </Button>
        </div>

        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute cursor-pointer left-8 lg:left-15 top-1/2 transform z-10 translate-y-[100%] bg-white/50 hover:bg-white transition-all shadow-lg p-2 rounded-full"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute cursor-pointer right-8 lg:right-15 top-1/2 z-10 transform translate-y-[100%] bg-white/50 hover:bg-white transition-all shadow-lg p-2 rounded-full"
        >
          <FaChevronRight size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 hide-scrollbar overflow-x-auto scroll-smooth py-4"
        >
          {countries.slice(0, 15).map((country) => (
            <VisaCard 
              key={`${country.continent}-${country.id}`}
              image={country.landmark}
              name={country.name}
              continent={country.continent}
              price={country.price ? `₹${Number(country.price).toLocaleString()}` : "Price not available"}
              visasOnTime={country.visasOnTime || "N/A"}
              isTrending={country.isTrending || false}
              visaType={country.visaType || country.basicInfo?.visaType || "Tourist Visa"}
            />
          ))}
        </div>
      </Layout>
    </section>
  );
}