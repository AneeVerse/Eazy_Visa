"use client";
import { useState } from 'react';
import Layout from '../../../components/common/Layout';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaPhoneAlt, FaWhatsapp, FaPlane, FaHotel, FaFilePdf, FaEdit, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FlightBookingComponent from '../../../components/dummyFlight/DummyBooking';
import HotelBookingComponent from '../../../components/dummyHotel/HotelBookingComponent';
import FeedbackReviewComponent from '../../../components/home/FeedbackReviewComponent';
import PricingComponent from '../../../components/common/PricingComponent';
import SupportSection from '../../../components/common/SupportSection';

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
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90">
      <Layout className="relative z-10">
        
        {/* Hero Section with Custom Image */}
        <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 mb-12">
          <Image
            src="/images/Flight & Hotel for Visa Applications.png"
            alt="Book Flight & Hotel for Visa Applications"
            fill
            className="object-cover object-center rounded-xl"
          />
        </div>

        {/* Main Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Need a <span className="text-blue-600">Flight Ticket</span> or{' '}
            <span className="text-green-600">Hotel Reservation</span> for Your Visa Application?
          </h2>
          
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4 mb-8">
            <p>
              There are some countries that have flight & hotel reservations as a mandatory requirement while applying for Visa. 
              However denial of visa application can lead to <span className="font-semibold text-red-600">heavy cancellation costs</span> of flight tickets and hotel reservations.
            </p>
          </div>

          <Link
            href="#pricing-section"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Reasons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
          id="pricing-section"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Reasons to use our service?</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <FaCheck className="text-green-500 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Legitimate & Verifiable</h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">Book legitimate and verifiable flight tickets and hotel reservations for your visa applications. All our documents are authentic and can be verified.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <FaFilePdf className="text-blue-500 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Instant PDF</h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">Instantly download PDF confirmations for your bookings. Get your dummy tickets delivered within minutes of payment confirmation.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <FaEdit className="text-purple-500 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Unlimited Revisions</h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">Unlimited date revisions, if you happen to change your travel schedule. We understand plans can change and we're here to help.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <FaTimes className="text-red-500 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-3 text-center">No Cancellation Fee</h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">No hidden charges or cancellation fees involved. What you see is what you pay - transparent pricing with no surprises.</p>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-16">
          <SupportSection className="text-center" />
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