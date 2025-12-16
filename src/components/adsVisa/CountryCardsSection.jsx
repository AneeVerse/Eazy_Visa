"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import CountryCardPopupForm from './CountryCardPopupForm';

const countries = [
  {
    name: 'United Arab Emirates',
    shortName: 'UAE / Dubai',
    image: '/images/landmarks/Burj Khalifa tourist places in UAE Visa.webp',
    flag: '/images/flags/ae.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '3-5 Days',
    description: 'Quick visa processing for Dubai & UAE. Expert guidance for tourist and business visas.',
  },
  {
    name: 'United Kingdom',
    shortName: 'UK',
    image: '/images/landmarks/Big Ben tourist places in United Kingdom UK Visa.webp',
    flag: '/images/flags/gb.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '15-20 Days',
    description: 'Complete UK visa assistance with document verification and appointment booking.',
  },
  {
    name: 'United States',
    shortName: 'USA',
    image: '/images/landmarks/Tourist Places in United States Visa.webp',
    flag: '/images/flags/us.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '30-60 Days',
    description: 'Expert USA visa consultancy. B1/B2 visa assistance with interview preparation.',
  },
  {
    name: 'Canada',
    shortName: 'Canada',
    image: '/images/landmarks/Tourist Places in Canada Visa.webp',
    flag: '/images/flags/ca.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '20-30 Days',
    description: 'Canada visitor visa help with complete documentation and application support.',
  },
  {
    name: 'Schengen',
    shortName: 'Europe',
    image: '/images/landmarks/Eiffel Tower in France Visa.webp',
    flag: '/images/flags/fr.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '15-20 Days',
    description: 'Schengen visa for 27 European countries. Expert itinerary and hotel booking services.',
  },
  {
    name: 'Singapore',
    shortName: 'Singapore',
    image: '/images/landmarks/Marina Bay Sands tourist places in Singapore Visa.webp',
    flag: '/images/flags/sg.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '3-5 Days',
    description: 'Fast Singapore visa processing with verified flight itinerary and hotel bookings.',
  },
  {
    name: 'Thailand',
    shortName: 'Thailand',
    image: '/images/landmarks/Grand Palace tourist places in Thailand Visa.webp',
    flag: '/images/flags/th.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '5-7 Days',
    description: 'Thailand visa assistance with complete document preparation and submission.',
  },
  {
    name: 'Japan',
    shortName: 'Japan',
    image: '/images/landmarks/Mount Fuji in Japan Visa.webp',
    flag: '/images/flags/jp.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '7-10 Days',
    description: 'Japan visa consultancy with detailed itinerary planning and documentation.',
  },
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
      <section id="country-cards-section" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[50px]">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Visa Services for <span className="text-blue-600">100+ Countries</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Expert visa consultancy with WhatsApp support, fast processing & trusted documentation services
            </p>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={(e) => handleCardClick(e, country)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-40 sm:h-44 overflow-hidden">
                    <Image
                      src={country.image}
                      alt={`${country.name} Visa`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Country Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={28}
                          height={28}
                          className="rounded-sm shadow"
                        />
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                            {country.shortName}
                          </h3>
                          <p className="text-xs text-blue-200">Visa Services</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Visa Types */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {country.visaTypes.map((type, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                        >
                          <FaCheckCircle className="text-green-500 text-[8px]" />
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {country.description}
                    </p>

                    {/* Processing Time */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                      <BiSupport className="text-blue-500" />
                      <span>Processing: <strong className="text-gray-700">{country.processingTime}</strong></span>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                        Get Free Consultation
                        <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>WhatsApp Support</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>Expert Consultants</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span>10+ Years Experience</span>
            </div>
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
