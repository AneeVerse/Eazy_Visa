"use client";

import { useState } from "react";
import VisaCard from "@/components/cards/VisaCard";
import Pagination from "@/components/common/Pagination";
import { countryData } from "@/data/countryData";
import Layout from "@/components/common/Layout";
import CountryBanner from "@/components/countries/CountryBanner";
import BlogSection from "@/components/home/BlogSection";
import VisaSolutions from "@/components/home/VisaSolutions";

export default function Countries() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [continent, setContinent] = useState("All Continents");
  const [sortBy, setSortBy] = useState("Most Popular");
  const itemsPerPage = 8;

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
  const visibleCountries = sortedCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="">
      <CountryBanner image="/images/landmarks/gateway-of-india.jpeg" title="Discovering the wonders of our planet, one adventure at a time" />

      <Layout className=" mt-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-5 justify-between items-center mb-10">
          <input
            type="text"
            placeholder="Search for places, hotels or restaurants"
            className="w-full md:w-1/3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
          >
            <option>All Continents</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>North America</option>
            <option>South America</option>
            <option>Africa</option>
            <option>Oceania</option>
          </select>
          <select
            className="w-full md:w-1/4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Most Popular</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>

        {/* Visa Cards */}
        <div className="flex flex-wrap justify-around gap-6">
          {visibleCountries.map((country) => (
            <VisaCard key={country.id} {...country} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      </Layout>
      <VisaSolutions />
      <BlogSection />
    </div>
  );
}