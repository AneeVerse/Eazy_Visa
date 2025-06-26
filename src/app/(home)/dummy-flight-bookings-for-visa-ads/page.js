"use client";
import { useState } from 'react';
import Layout from '../../../components/common/Layout';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaPhoneAlt, FaWhatsapp, FaPlane, FaHotel } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FlightBookingComponent from '../../../components/dummyFlight/DummyBooking';
import HotelBookingComponent from '../../../components/dummyHotel/HotelBookingComponent';
import FeedbackReviewComponent from '../../../components/home/FeedbackReviewComponent';
import PricingComponent from '../../../components/common/PricingComponent';
import SupportSection from '../../../components/common/SupportSection';
import HeroBookingSection from '../../../components/dummyFlight/HeroBookingSection';

const DummyFlightBookingsAdsPage = () => {
  const [showFlightBooking, setShowFlightBooking] = useState(true);
  const [showHotelBooking, setShowHotelBooking] = useState(false);

  const plans = [
    {
      name: "Flight Itinerary",
      description: "24 Hours Delivery",
      price: "999",
      billing: "per person",
      note: "",
      features: [
        "24 Hours Delivery",
        "Unlimited Flights",
        "Name change not allowed"
      ],
      type: "flight",
      popular: false
    },
    {
      name: "Hotel Booking",
      description: "24 Hours Delivery", 
      price: "999",
      billing: "per person",
      note: "*Price applicable for 2+ passengers",
      features: [
        "24 Hours Delivery",
        "Verifiable Hotel Confirmation",
        "Name change not allowed"
      ],
      type: "hotel",
      popular: false
    },
    {
      name: "Daywise Itinerary",
      description: "24 Hours Delivery",
      price: "999", 
      billing: "per person",
      note: "",
      features: [
        "24 Hours Delivery",
        "Day wise Sightseeing",
        "Details of the tour for the duration"
      ],
      type: "flight",
      popular: false
    },
    {
      name: "Most Preferred",
      description: "24 Hours Delivery",
      price: "1499",
      billing: "per person",
      note: "*Price applicable for 2+ passengers",
      features: [
        "24 Hours Delivery",
        "Flight Itinerary",
        "Hotel Confirmation", 
        "Day wise Itinerary",
        "Name change not allowed"
      ],
      type: "both",
      popular: true
    }
  ];

  const handleBookingClick = (plan) => {
    const type = plan.type;
    if (type === 'flight' || type === 'both') {
      setShowFlightBooking(true);
      setShowHotelBooking(false);
    } else if (type === 'hotel') {
      setShowHotelBooking(true);
      setShowFlightBooking(false);
    }
    
    // Scroll to booking section
    setTimeout(() => {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* New Hero Section */}
      <HeroBookingSection />
      
      <Layout className="relative z-10 bg-white pt-32 pb-16 mb-16">

        {/* Pricing Cards Section - Moved up to accommodate floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-40 mb-20"
          id="pricing-section"
        >
          <div
            className="pricing-cards-container flex justify-center gap-8 mx-auto"
            style={{ width: "calc(4 * 20rem + 3 * 2rem)", maxWidth: "100%" }}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                style={{ width: "20rem", minWidth: "20rem", height: "500px" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl backdrop-blur-sm bg-white/70 border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col
                  ${plan.popular ? 'ring-2 ring-blue-500/50 shadow-blue-100/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="absolute top-[-50px] right-0 p-2">
                  <img src='/images/pricing/hourly-badge1.png' alt="hourly" className="w-20 h-20" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      {plan.icon && <plan.icon className="text-blue-600 text-3xl mb-3" />}
                      <h2 className="text-xl mb-5 font-bold text-gray-900">{plan.name}</h2>
                    </div>
                  </div>
                  <div className="mb-3 flex items-baseline">
                    <p className="text-3xl font-bold text-blue-600">
                      ₹{plan.price}
                    </p>
                    <p className="text-black mb-5 font-semibold text-[13px]">/{plan.billing}</p>
                  </div>
                  <p 
                    style={{"color": `${plan.popular ? "#0B82E6":""}`}} 
                    className={`${plan.note != "" ? " mt-[-6px]  ":" hidden "}text-black mb-5 font-semibold text-[12px]`}
                  >
                    {plan.note}
                  </p>
                </div>
                <div className="border-t border-gray-200/50 px-6 pt-5 pb-6 bg-white/30 flex-1 flex flex-col justify-between">
                  <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What&apos;s included:</h3>
                    <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 mr-2 mt-0.5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <FaCheck className="h-3 w-3" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={() => handleBookingClick(plan)}
                      className={`w-full block text-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm
                        ${plan.popular 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md' 
                          : 'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Second CTA Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Your Visa Documents?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your visa application process today with our reliable and verifiable dummy bookings. Trusted by thousands of successful visa applicants worldwide.
          </p>
        </div>

        {/* Booking Section */}
        <div id="booking-section" className="mb-16">
          {showFlightBooking && (
            <div className="mb-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Complete Your Flight Booking</h3>
                <p className="text-lg text-gray-600 text-center mb-8">Fill in your flight details to get your dummy booking for visa application</p>
              </div>
              <FlightBookingComponent onTabClick={(type) => handleBookingClick({ type })} />
            </div>
          )}

          {showHotelBooking && (
            <div className="mb-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Complete Your Hotel Booking</h3>
                <p className="text-lg text-gray-600 text-center mb-8">Fill in your hotel details to get your dummy booking for visa application</p>
              </div>
              <HotelBookingComponent onTabClick={(type) => handleBookingClick({ type })} />
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <FeedbackReviewComponent />

        {/* Help Section */}
        <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40"></div>
              <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full opacity-50"></div>
            </div>
            
                         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8">
               {/* Left Content */}
               <div className="flex-1 text-white mb-6 lg:mb-0 lg:pr-8">
                 <div className="flex items-center mb-4">
                   <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-4">
                     <FaWhatsapp className="text-blue-600 text-xl" />
                   </div>
                   <div>
                     <h3 className="text-2xl lg:text-3xl font-bold mb-2">Need Help Choosing?</h3>
                     <p className="text-blue-100 text-base lg:text-lg">Our visa specialists are available to help you select the perfect plan for your needs.</p>
                   </div>
                 </div>
                 
                 <div className="mb-4">
                   <p className="text-white font-medium text-lg mb-1">Get In Touch</p>
                   <p className="text-blue-100 text-sm lg:text-base">Email: support@eazyvisas.com & Phone: +917700006525</p>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-3">
                   <a 
                     href="https://wa.me/917700006525" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg text-sm lg:text-base"
                   >
                     <FaWhatsapp className="mr-2" />
                     Chat with us
                   </a>
                   <a 
                     href="tel:+917700006525"
                     className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 border-2 border-white shadow-lg text-sm lg:text-base"
                   >
                     <FaPhoneAlt className="mr-2" />
                     Call Support
                   </a>
                 </div>
               </div>
               
               {/* Right Icon */}
               <div className="flex-shrink-0">
                 <div className="relative">
                   <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                     <FaPlane className="text-blue-600 text-3xl lg:text-4xl transform rotate-12" />
                   </div>
                   {/* Decorative elements */}
                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-80"></div>
                   <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full opacity-60"></div>
                   <div className="absolute top-1/2 -right-3 w-2 h-2 bg-white rounded-full opacity-40"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>

      </Layout>
      
      <Footer className="relative z-10" />
      
      <style jsx global>{`
        /* Animation styles */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }

        /* Responsive pricing cards */
        @media (max-width: 900px) {
          .pricing-cards-container {
            flex-direction: column !important;
            width: 100% !important;
            gap: 1.5rem !important;
          }
          .pricing-cards-container > * {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DummyFlightBookingsAdsPage;