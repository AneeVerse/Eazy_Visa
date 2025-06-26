"use client";
import { useState } from 'react';
import Layout from '../../../components/common/Layout';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaPhoneAlt, FaWhatsapp, FaPlane, FaHotel, FaShieldAlt, FaFilePdf, FaEdit, FaBan } from 'react-icons/fa';
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
      
      {/* Feature Cards Section */}
      <div className="relative z-30 bg-white py-12 lg:py-0">
                 <div className="max-w-none mx-auto px-4 lg:absolute lg:-bottom-20 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2 w-full">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-screen-xl mx-auto">
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="bg-white p-4 lg:p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 lg:h-64"
             >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-green-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaShieldAlt className="text-green-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">Legitimate & Verifiable</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">Book legitimate and verifiable flight tickets and hotel reservations for your visa applications. All our documents are authentic and can be verified.</p>
                </div>
              </div>
            </motion.div>
            
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="bg-white p-4 lg:p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 lg:h-64"
             >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaFilePdf className="text-blue-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">Instant PDF</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">Instantly download PDF confirmations for your bookings. Get your dummy tickets delivered within minutes of payment confirmation.</p>
                </div>
              </div>
            </motion.div>
            
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="bg-white p-4 lg:p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 lg:h-64"
             >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-purple-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaEdit className="text-purple-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">Unlimited Revisions</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">Unlimited date revisions, if you happen to change your travel schedule. We understand plans can change and we&apos;re here to help.</p>
                </div>
              </div>
            </motion.div>
            
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="bg-white p-4 lg:p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 lg:h-64"
             >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-red-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaBan className="text-red-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">No Cancellation Fee</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">No hidden charges or cancellation fees involved. What you see is what you pay - transparent pricing with no surprises.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Layout className="relative z-20 bg-white pt-8 lg:pt-32 pb-16 mb-16">

        {/* Pricing Cards Section - Moved up to accommodate floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 sm:mt-24 lg:mt-40 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-0"
          id="pricing-section"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl backdrop-blur-sm bg-white/70 border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-[500px] w-full max-w-sm mx-auto
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
                  <Image src='/images/pricing/hourly-badge1.png' alt="hourly" width={80} height={80} className="w-20 h-20" />
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
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Your Visa Documents?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Start your visa application process today with our reliable and verifiable dummy bookings. Trusted by thousands of successful visa applicants worldwide.
          </p>
        </div>

        {/* Booking Section */}
        <div id="booking-section" className="mb-16">
          {showFlightBooking && (
            <div className="mb-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">Complete Your Flight Booking</h3>
                <p className="text-base sm:text-lg text-gray-600 text-center mb-8">Fill in your flight details to get your dummy booking for visa application</p>
              </div>
              <FlightBookingComponent onTabClick={(type) => handleBookingClick({ type })} />
            </div>
          )}

          {showHotelBooking && (
            <div className="mb-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">Complete Your Hotel Booking</h3>
                <p className="text-base sm:text-lg text-gray-600 text-center mb-8">Fill in your hotel details to get your dummy booking for visa application</p>
              </div>
              <HotelBookingComponent onTabClick={(type) => handleBookingClick({ type })} />
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <FeedbackReviewComponent />

        {/* Help Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40"></div>
              <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full opacity-50"></div>
            </div>
            
                         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-8">
               {/* Left Content */}
               <div className="flex-1 text-white mb-6 lg:mb-0 lg:pr-8 text-center lg:text-left">
                 <div className="flex flex-col sm:flex-row items-center mb-4">
                   <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                     <FaWhatsapp className="text-blue-600 text-lg sm:text-xl" />
                   </div>
                   <div>
                     <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Need Help Choosing?</h3>
                     <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Our visa specialists are available to help you select the perfect plan for your needs.</p>
                   </div>
                 </div>
                 
                 <div className="mb-4">
                   <p className="text-white font-medium text-base sm:text-lg mb-1">Get In Touch</p>
                   <p className="text-blue-100 text-xs sm:text-sm lg:text-base">Email: support@eazyvisas.com & Phone: +917700006525</p>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
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


      `}</style>
    </div>
  );
};

export default DummyFlightBookingsAdsPage;