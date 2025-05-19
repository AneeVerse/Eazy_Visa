"use client";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiSearch, FiChevronDown, FiChevronUp, FiArrowRight, FiStar } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Layout from "../common/Layout";

const services = [
  {
    id: 1,
    title: "Tourist Visa",
    url: "/tourist-visa",
    description: "Complete assistance for tourist visa applications to your dream destinations",
    image:
      "/images/home/tourist-visa.png",
    rating: 4.9,
    size: "small",
  },
  {
    id: 2,
    title: "Business Visa",
    url: "/business-visa",
    description: "Streamlined business visa processing for corporate travelers",
    image: "/images/home/business-visa.webp",
    rating: 4.3,
    size: "small",
  },
  {
    id: 3,
    title: "End to End visa assistance",
    url: "/end-to-end",
    description: "Comprehensive visa support from documentation to approval",
    image: "/images/home/passport-image.png",
    rating: 4.7,
    size: "small",
  },
  {
    id: 4,
    title: "Dummy Flights",
    url: "/dummy-flights",
    description: "Verifiable flight tickets for visa applications",
    image:
      "/images/home/dummy-flight.webp",
    rating: 4.9,
    size: "large",
  },
  {
    id: 5,
    title: "Dummy Hotel",
    url: "/dummy-hotel",
    description: "Verifiable hotel booking for visa applications",
    image:
    "/images/home/dummy-hotel.webp",
    rating: 4.6,
    size: "large",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  {name: "Dummy Bookings", href: "/dummy-bookings"},
  { name: "Visa Services", href: "/services", hasMegaMenu: true },
  { name: "Countries", href: "/countries" },
  { name: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const megaMenuRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch countries based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjs4OV12cMUkGj_OV7CYQpYE2q5cr9vzPlf5OqQAnowj7hifoxD0w3nrgqRPVIxAMe2ZEet6H2Uojsb-4Fy3gC5ahoF6ICREzopNHQBp20sLfhyWfQ5AFdCjBJS-qDLark3BHaWlzXAoS304j-GtnMHjw0a0g3YHTnZW67poaoPIK45HNUeoJ3lysgCG36e4WUszaLhB4_pkLcE0vcHN13Uv7qR_3nEHcF_JslMjliXHfUS_aL7Uv0jRDOyo3AToAf85CkOiZMl3_xuRkqymvwjN92aIw&lib=MNOr_3U-ifGUiHYeVYNtbhEhiku5JnKVW`
        );
        const countries = await response.json();
        
        const filtered = countries.filter(country => 
          country.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5); // Limit to 5 results
        
        setSearchResults(filtered);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleServiceHover = (serviceId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveService(serviceId);
  };

  const handleServiceLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveService(null);
    }, 200);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Close mega menu
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target) &&
          servicesButtonRef.current && !servicesButtonRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      
      // Close search results
      if (searchInputRef.current && !searchInputRef.current.contains(event.target) &&
          searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/countries?search=${encodeURIComponent(searchQuery)}#countrysearch`;
      setShowSearchResults(false);
    }
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white fixed w-full top-0 z-50 border-b border-gray-100">
        <Layout className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/logo/main-logo.png" 
                alt="Eazy Visas Logo" 
                className="h-11 w-auto"
                width={36}
                height={36}
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-5  xl:gap-8 relative">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasMegaMenu ? (
                  <div
                    ref={servicesButtonRef}
                    className="flex items-center gap-1 cursor-pointer group"
                    onMouseEnter={() => setIsServicesOpen(true)}
                  >
                    <span className="text-gray-800 group-hover:text-blue-600 transition-colors duration-200 font-bold text-[14px]">
                      {link.name}
                    </span>
                    <FiChevronDown className={`text-gray-500 group-hover:text-blue-600 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isServicesOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  </div>
                ) : (
                  <Link 
                    href={link.href} 
                    className="group relative"
                    onMouseEnter={() => setIsServicesOpen(false)}
                  >
                    <span className="text-gray-800 group-hover:text-blue-600 transition-colors text-[14px] font-bold duration-200 ">
                      {link.name}
                    </span>
                    <div className="absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 w-0 group-hover:w-full"></div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Search and CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <img src="/images/icon/png/flight.png" alt="Search Icon" className="absolute left-3 w-auto h-[18px] top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    ref={searchInputRef}
                    className="w-[116px] lg:w-[116px] xl:w-64 px-4 py-2 pl-8 pr-12 text-[15px] rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Travel Starts Here"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSearchResults(true)}
                  />
                  <button
                    type="submit"
                    className="absolute right-[4px] bg-blue-600 rounded-full flex items-center justify-center w-[34px] h-[34px] top-1/2 transform -translate-y-1/2 text-white hover:text-white-600"
                  >
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div 
                  ref={searchResultsRef}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                >
                  <div className="py-2">
                    <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Countries
                    </h3>
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map((country) => (
                        <Link
                          key={country.id}
                          href={`/countries/${country.slug || country.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                        >
                          <div className="flex items-center">
                            <img 
                              src={country.flag} 
                              alt={country.name} 
                              className="w-5 h-3.5 mr-2 rounded-sm object-cover"
                            />
                            {country.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm hover:shadow-md font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 text-2xl p-2 -mr-2"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </Layout>

        {/* Mega Menu - Desktop Only */}
        {isServicesOpen && (
          <div
            className="hidden lg:block absolute top-[52px] pt-[28px] left-0 w-full z-40 "
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
            ref={megaMenuRef}
          >
            <div className="bg-white shadow-lg overflow-y-auto h-screen pb-12 lg:pb-0 lg:h-auto border-t border-gray-100">
              <Layout className="py-8 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Services Grid */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Visa & Travel Services</h2>
                      <p className="text-gray-500 mt-1">Comprehensive solutions for all your travel needs</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services${service.url}`}
                          className={`group relative overflow-hidden rounded-xl border ${activeService === service.id ? 'border-blue-200 bg-blue-50' : 'border-gray-100 hover:border-blue-100'} transition-all duration-200 p-5`}
                          onMouseEnter={() => handleServiceHover(service.id)}
                          onMouseLeave={handleServiceLeave}
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {service.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                            </div>
                          </div>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                            <FiArrowRight className="w-5 h-5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Help Section */}
                  <div className="bg-gray-50 rounded-xl p-6 h-full">
                    <div className="sticky top-24">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-2">Visa Consultation</h4>
                          <p className="text-sm text-gray-500 mb-3">Get personalized advice from our visa experts</p>
                          <Link
                            href="/contact"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            Schedule a call
                            <FiArrowRight className="ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                        
                        {/* <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-2">Document Checklist</h4>
                          <p className="text-sm text-gray-500 mb-3">Download our comprehensive visa requirements</p>
                          <Link
                            href="/resources/checklist"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            Download PDF
                            <FiArrowRight className="ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div> */}
                        
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg text-white">
                          <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
                          <p className="text-sm text-blue-100 mb-4">Have urgent questions? Our team is always available</p>
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            Contact Support
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Layout>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link href="/" className="flex items-center" onClick={handleMobileLinkClick}>
                <img 
                  src="/logo/main-logo.png" 
                  alt="Eazy Visas Logo" 
                  className="h-8 w-auto"
                />
              </Link>
              <button 
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto py-4 px-5">
              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  className="block w-full pl-3 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 text-[14px] focus:border-blue-500 outline-none transition"
                  placeholder="Travel Starts Here"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/countries?search=${encodeURIComponent(searchQuery)}#countrysearch`;
                      setIsOpen(false);
                    }
                  }}
                />
                <button
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      window.location.href = `/countries?search=${encodeURIComponent(searchQuery)}#countrysearch`;
                      setIsOpen(false);
                    }
                  }}
                >
                  <FiSearch />
                </button>
                
                {/* Mobile Search Results */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="py-2">
                      {searchResults.map((country) => (
                        <Link
                          key={country.id}
                          href={`/countries/${country.slug || country.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                            setIsOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <img 
                              src={country.flag} 
                              alt={country.name} 
                              className="w-5 h-3.5 mr-2 rounded-sm object-cover"
                            />
                            {country.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation - Mobile shows dropdown for services */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-gray-100 last:border-0">
                    {link.hasMegaMenu ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full py-3.5 text-[14px] text-left text-gray-800 hover:text-blue-600 font-bold"
                          // onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                          <span>{link.name}</span>
                          {/* <FiChevronDown className={`text-gray-500 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} /> */}
                        </button>
                        {!isServicesOpen && (
                          <div className="pb-3 pl-4 space-y-2">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services${service.url}`}
                                className="block py-2.5 px-3 rounded-lg text-gray-600 font-bold text-[14px] hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                onClick={handleMobileLinkClick}
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block py-3.5 text-[14px] text-gray-800 hover:text-blue-600 font-bold"
                        onClick={handleMobileLinkClick}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            
            {/* Footer */}
            <div className="p-5 border-t border-gray-100">
              <Link
                href="/contact"
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium shadow-sm"
                onClick={handleMobileLinkClick}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}