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
      
      <Layout className="relative z-10 bg-white py-16">

        {/* Reasons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
          id="pricing-section"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Reasons to use our service?</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-26">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:opacity-0">
                  <FaCheck className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-3 text-lg transition-all duration-300 group-hover:opacity-0">Legitimate & Verifiable</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-sm">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-4 flex items-center justify-center">
                  <p className="text-sm leading-relaxed text-center">Book legitimate and verifiable flight tickets and hotel reservations for your visa applications. All our documents are authentic and can be verified.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:opacity-0">
                  <FaPlane className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-3 text-lg transition-all duration-300 group-hover:opacity-0">Instant PDF</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-sm">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-4 flex items-center justify-center">
                  <p className="text-sm leading-relaxed text-center">Instantly download PDF confirmations for your bookings. Get your dummy tickets delivered within minutes of payment confirmation.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:opacity-0">
                  <FaCheck className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-3 text-lg transition-all duration-300 group-hover:opacity-0">Unlimited Revisions</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-sm">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-4 flex items-center justify-center">
                  <p className="text-sm leading-relaxed text-center">Unlimited date revisions, if you happen to change your travel schedule. We understand plans can change and we&apos;re here to help.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:opacity-0">
                  <FaCheck className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-3 text-lg transition-all duration-300 group-hover:opacity-0">No Cancellation Fee</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-sm">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-4 flex items-center justify-center">
                  <p className="text-sm leading-relaxed text-center">No hidden charges or cancellation fees involved. What you see is what you pay - transparent pricing with no surprises.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <PricingComponent 
            plans={plans}
            showBadge={true}
            onPlanClick={handleBookingClick}
            buttonText="Get Started"
            enableAnimation={true}
          />
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
      
      {/* Animation styles */}
      <style jsx global>{`
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