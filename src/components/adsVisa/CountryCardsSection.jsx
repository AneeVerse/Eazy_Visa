"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import CountryCardPopupForm from './CountryCardPopupForm';

const countries = [
  {
    name: 'United Kingdom',
    shortName: 'UK',
    image: '/images/landmarks/Big Ben tourist places in United Kingdom UK Visa.webp',
    flag: '/images/flags/gb.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '15-20 Days',
    description: 'Complete UK visa assistance with document verification and appointment booking support.',
  },
  {
    name: 'United States',
    shortName: 'USA',
    image: '/images/landmarks/Tourist Places in United States Visa.webp',
    flag: '/images/flags/us.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '30-60 Days',
    description: 'Expert USA visa consultancy with B1/B2 assistance and interview preparation support.',
  },
  {
    name: 'Schengen',
    shortName: 'Schengen',
    image: '/images/landmarks/Colosseum in Italy Visa.webp',
    flag: '/images/flags/eu.png',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '15-20 Days',
    description: 'Schengen visa support for travel across Europe, with guidance plus itinerary and hotel booking documentation when needed.',
  },
  {
    name: 'France',
    shortName: 'France',
    image: '/images/landmarks/Eiffel Tower in France Visa.webp',
    flag: '/images/flags/fr.webp',
    visaTypes: ['Tourist Visa', 'Business Visa'],
    processingTime: '15-20 Days',
    description: 'Applying for France? Get Schengen-ready guidance with document review and clear next steps for tourism, meetings, and business travel.',
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
              Visa Services for <span className="text-blue-600">UK, US, Schengen & France</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your destination. Then select Tourist or Business visa support from the form below.
            </p>
          </div>

          {/* Country Cards Grid - 4 larger cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={(e) => handleCardClick(e, country)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  {/* Image Section - Larger for 4 cards */}
                  <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
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
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={country.flag}
                          alt={country.name}
                          width={36}
                          height={36}
                          className="rounded-sm shadow"
                        />
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                            {country.shortName}
                          </h3>
                          <p className="text-sm text-blue-200">Visa Services</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - More padding for larger cards */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Visa Types */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {country.visaTypes.map((type, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full"
                        >
                          <FaCheckCircle className="text-green-500 text-[10px]" />
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {country.description}
                    </p>

                    {/* Processing Time */}
                    <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
                      <BiSupport className="text-blue-500 text-lg" />
                      <span>Processing: <strong className="text-gray-700">{country.processingTime}</strong></span>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                        Get Free Consultation
                        <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
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
