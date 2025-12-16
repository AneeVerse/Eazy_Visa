"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaMapMarkerAlt, FaBed, FaPassport, FaUtensils, FaCamera, FaClock } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import CountryCardPopupForm from './CountryCardPopupForm';

const countries = [
  {
    name: 'United Kingdom',
    image: '/images/landmarks/Big Ben tourist places in United Kingdom UK Visa.webp',
    flag: '/images/flags/gb.webp',
    rating: 4.9,
    reviews: '600+',
    visaType: 'Tourist Visa',
    salePrice: '₹8,999',
    actualPrice: '₹12,999',
    discount: '30% OFF',
    tagline: 'Historic Charm & Royal Splendor',
    packageTitle: 'Explore United Kingdom Tour Package',
    duration: { nights: 5, days: 6 },
    stay: 5,
    meals: 4,
    sightseeing: 4,
    activities: ['London City Tour', 'Big Ben & Palace', 'Thames Cruise', 'Oxford Street'],
    link: '/countries/europe/united-kingdom'
  },
  {
    name: 'United States',
    image: '/images/landmarks/Tourist Places in United States Visa.webp',
    flag: '/images/flags/us.webp',
    rating: 4.9,
    reviews: '800+',
    visaType: 'Tourist Visa',
    salePrice: '₹12,999',
    actualPrice: '₹18,999',
    discount: '25% OFF',
    tagline: 'Land of Endless Opportunities',
    packageTitle: 'Amazing United States Tour Package',
    duration: { nights: 7, days: 8 },
    stay: 7,
    meals: 6,
    sightseeing: 5,
    activities: ['NYC Tour', 'Statue of Liberty', 'Times Square', 'Central Park'],
    link: '/countries/north-america/united-states'
  },
  {
    name: 'Canada',
    image: '/images/landmarks/Tourist Places in Canada Visa.webp',
    flag: '/images/flags/ca.webp',
    rating: 4.8,
    reviews: '500+',
    visaType: 'Tourist Visa',
    salePrice: '₹9,999',
    actualPrice: '₹15,999',
    discount: '35% OFF',
    tagline: 'Nature\'s Playground',
    packageTitle: 'Discover Canada Tour Package',
    duration: { nights: 6, days: 7 },
    stay: 6,
    meals: 5,
    sightseeing: 4,
    activities: ['Toronto City Tour', 'CN Tower', 'Niagara Falls', 'Parliament Hill'],
    link: '/countries/north-america/canada'
  },
  {
    name: 'Australia',
    image: '/images/landmarks/Sydney Opera House in Australia Visa.webp',
    flag: '/images/flags/au.webp',
    rating: 4.9,
    reviews: '700+',
    visaType: 'Tourist Visa',
    salePrice: '₹10,999',
    actualPrice: '₹16,999',
    discount: '28% OFF',
    tagline: 'Down Under Adventure',
    packageTitle: 'Ultimate Australia Tour Package',
    duration: { nights: 5, days: 6 },
    stay: 5,
    meals: 4,
    sightseeing: 5,
    activities: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'Wildlife Park'],
    link: '/countries/oceania/australia'
  }
];

const CountryCardsSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCardClick = (e, country) => {
    e.preventDefault();
    setSelectedCountry(country);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCountry(null);
  };

  return (
    <>
      <section id="country-cards-section" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[50px]">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Popular <span className="text-blue-600">Destinations</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Get your visa approved for these amazing destinations with our reliable service
            </p>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={(e) => handleCardClick(e, country)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <Image
                      src={country.image}
                      alt={country.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                      {country.discount}
                    </div>

                    {/* Country Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={24}
                          height={24}
                          className="rounded-sm"
                        />
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {country.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-200 font-medium">
                        {country.tagline}
                      </p>
                    </div>

                    {/* Favorite Icon */}
                    <div className="absolute top-3 left-3 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Rating and Location Row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs font-semibold text-gray-900">{country.rating}</span>
                        <span className="text-xs text-gray-500">({country.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaMapMarkerAlt className="text-xs text-blue-500" />
                        <span className="text-xs">{country.name}</span>
                      </div>
                    </div>

                    {/* Package Title */}
                    <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">
                      {country.packageTitle}
                    </h4>

                    {/* Icons Row - Stay, Visa, Meals, Sightseeing with numbers */}
                    <div className="flex items-center justify-between mb-2 py-2 border-y border-gray-100">
                      <div className="flex flex-col items-center gap-0.5" title="Stay">
                        <div className="flex items-center gap-1">
                          <FaBed className="text-gray-600 text-xs" />
                          <span className="text-xs font-semibold text-gray-800">{country.stay}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">Stay</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5" title="Visa">
                        <div className="flex items-center gap-1">
                          <FaPassport className="text-gray-600 text-xs" />
                          <IoMdCheckmarkCircleOutline className="text-green-500 text-xs" />
                        </div>
                        <span className="text-[10px] text-gray-500">Visa</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5" title="Meals">
                        <div className="flex items-center gap-1">
                          <FaUtensils className="text-gray-600 text-xs" />
                          <span className="text-xs font-semibold text-gray-800">{country.meals}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">Meals</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5" title="Sightseeing">
                        <div className="flex items-center gap-1">
                          <FaCamera className="text-gray-600 text-xs" />
                          <span className="text-xs font-semibold text-gray-800">{country.sightseeing}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">Sights</span>
                      </div>
                    </div>

                    {/* Activities List */}
                    <div className="mb-2">
                      <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                        {country.activities.join(' • ')}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <FaClock className="text-gray-500 text-xs" />
                      <span className="text-xs font-medium text-gray-700">
                        {country.duration.nights}N & {country.duration.days}D
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-[10px] text-gray-500 block">Sale Price</span>
                          <span className="text-lg font-bold text-green-600">{country.salePrice}</span>
                          <span className="text-[10px] text-gray-500 ml-1">per person</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-500 block">Actual Price</span>
                          <span className="text-sm font-semibold text-red-500 line-through">{country.actualPrice}</span>
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-300 shadow-md hover:shadow-lg">
                        Get Visa Now →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup Form */}
      <CountryCardPopupForm
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        selectedCountry={selectedCountry?.name}
        countryImage={selectedCountry?.image}
        countryFlag={selectedCountry?.flag}
      />
    </>
  );
};

export default CountryCardsSection;
