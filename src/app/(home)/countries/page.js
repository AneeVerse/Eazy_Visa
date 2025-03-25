"use client";

import { useState, useRef, useEffect } from "react";
import VisaCard from "@/components/cards/VisaCard";
import Pagination from "@/components/common/Pagination";
import { countryData } from "@/data/countryData";
import Layout from "@/components/common/Layout";
import CountryBanner from "@/components/countries/CountryBanner";
import BlogSection from "@/components/home/BlogSection";
import VisaSolutions from "@/components/home/VisaSolutions";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={selectRef}
      className={`relative ${className}`}
    >
      <button
        type="button"
        className={`w-full flex items-center justify-between px-4 py-3 border rounded-full bg-white transition-all duration-200 ${
          isOpen ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || placeholder}</span>
        <FiChevronDown 
          className={`ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-1 w-full bg-white shadow-lg rounded-xl py-1 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                value === option
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
              {value === option && (
                <FiCheck className="h-5 w-5 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Countries() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [continent, setContinent] = useState("All Continents");
  const [sortBy, setSortBy] = useState("Most Popular");
  const itemsPerPage = 8;

  // Continent options
  const continentOptions = [
    "All Continents",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania"
  ];

  // Sort options
  const sortOptions = [
    "Most Popular",
    "Lowest Price",
    "Highest Price"
  ];

  // Filter by continent
  const filteredByContinent =
    continent === "All Continents"
      ? countryData
      : countryData.filter((country) => country.continent === continent);

  // Search Filter
  const searchedCountries = filteredByContinent.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting Logic
  const sortedCountries = [...searchedCountries].sort((a, b) => {
    if (sortBy === "Lowest Price") {
      return parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", ""));
    }
    if (sortBy === "Highest Price") {
      return parseInt(b.price.replace("₹", "")) - parseInt(a.price.replace("₹", ""));
    }
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedCountries.length / itemsPerPage);
  const visibleCountries = sortedCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="">
      <CountryBanner
        image="/images/countries/banner.png"
        title="Discovering the wonders of our planet, one adventure at a time"
      />

      <Layout className="mt-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-5 justify-between items-center mb-10">
          <input
            type="text"
            placeholder="Search for places, hotels or restaurants"
            className="w-full md:w-1/3 px-4 py-3 border rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <CustomSelect
            options={continentOptions}
            value={continent}
            onChange={setContinent}
            placeholder="Select Continent"
            className="w-full md:w-1/4"
          />

          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort By"
            className="w-full md:w-1/4"
          />
        </div>


{/*  if visiblecoutnries length 0 */}
        {visibleCountries.length === 0 && (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-lg text-gray-500">No countries found</p>
          </div>
        )}
        {/* Visa Cards */}
        <div className="flex mt-12 flex-wrap justify-center gap-6">
          {visibleCountries.map((country) => (
            <VisaCard key={country.id} {...country} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Layout>
      <VisaSolutions />
      <BlogSection />
    </div>
  );
}