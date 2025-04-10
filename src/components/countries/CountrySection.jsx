"use client";

import { useState, useEffect, useRef } from "react";
import { countryData } from "@/data/countryData";
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import CountryCard from "../cards/CountryCard";
import CountryCardSkeleton from "../common/CountryCardSkeleton";
import { useSearchParams } from "next/navigation";

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

const CountryFilter = ({ 
  search, 
  setSearch, 
  continent, 
  setContinent, 
  sortBy, 
  setSortBy,
  resetFilters
}) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between items-center mb-10">
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for countries..."
          className="pl-10 w-full px-4 py-3 border rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <IoMdClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <CustomSelect
        options={[
          "All Continents",
          "Asia",
          "Europe",
          "North America",
          "South America",
          "Africa",
          "Oceania"
        ]}
        value={continent}
        onChange={setContinent}
        placeholder="Select Continent"
        className="w-full md:w-1/4"
      />

      <CustomSelect
        options={[
          "Most Popular",
          "Lowest Price",
          "Highest Price",
        ]}
        value={sortBy}
        onChange={setSortBy}
        placeholder="Sort By"
        className="w-full md:w-1/4"
      />

      {(search !== "" || continent !== "All Continents" || sortBy !== "Most Popular") && (
        <button
          onClick={resetFilters}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default function CountrySection() {
  const searchName = useSearchParams();
  const searchParams = searchName.get("search");
  const [search, setSearch] = useState(searchParams || "");
  const [continent, setContinent] = useState("All Continents");
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [visibleCount, setVisibleCount] = useState(8); // Initial visible countries
  const loadMoreIncrement = 4; // How many to load each time

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
  
    if (hash === "#countrysearch") {
      setTimeout(() => {
        const section = document.getElementById("countrysearch");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  if (loading || countries.length === 0) {
    return (
      <div id="countrysearch" className="grid grid-cols-2 pt-12 md:grid-cols-3 lg:grid-cols-4 justify-around gap-3 md:gap-6">
        {Array.from({ length: 4 }, (_, index) => (
          <CountryCardSkeleton isWidthFull={true} key={index} />
        ))}
      </div>
    );
  }

  // Flatten country data from all continents
  const allCountries = countries;

  // Filter by continent
  const filteredByContinent =
    continent === "All Continents"
      ? allCountries
      : allCountries.filter((country) => country.continent === continent);

  // Search Filter
  const searchedCountries = filteredByContinent.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.description.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting Logic
  const sortedCountries = [...searchedCountries].sort((a, b) => {
    if (sortBy === "Lowest Price") {
      return parseInt(a.price) - parseInt(b.price);
    }
    if (sortBy === "Highest Price") {
      return parseInt(b.price) - parseInt(a.price);
    }
    // Default: Most Popular
    return (b.visasOnTime || 0) - (a.visasOnTime || 0);
  });

  // Get visible countries based on current count
  const visibleCountries = sortedCountries.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch("");
    setContinent("All Continents");
    setSortBy("Most Popular");
    setVisibleCount(4); // Reset to initial count when filters change
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + loadMoreIncrement);
  };

  return (
    <div id="countrysearch" className="pt-6 md:pt-16">
      {/* Filters */}
      <CountryFilter
        search={search}
        setSearch={setSearch}
        continent={continent}
        setContinent={setContinent}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resetFilters={resetFilters}
      />

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        Showing {visibleCountries.length} of {sortedCountries.length} countries
      </div>

      {/* No Results */}
      {visibleCountries.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[200px]">
          <p className="text-lg text-gray-500 mb-4">No countries found matching your criteria</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Visa Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-around gap-3 md:gap-6">
        {visibleCountries.map((country) => (
          <CountryCard 
            key={`${country.continent}-${country.id}`} 
            image={country.landmark}
            name={country.name}
            continent={country.continent}
            price={`₹${country.price}`}
            visasOnTime={country.visasOnTime}
            isTrending={country.isTrending || false}
            visaType={country.basicInfo?.visaType || "Tourist Visa"}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCountries.length < sortedCountries.length && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md rounded-lg  transition-colors duration-200 font-medium"
          >
            Load More Countries
          </button>
        </div>
      )}
    </div>
  );
}