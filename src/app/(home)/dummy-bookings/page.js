"use client";
import Layout from '../../../components/common/Layout';
import { Heading } from '../../../components/common/Typography';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';
import PricingComponent from '../../../components/common/PricingComponent';
import SupportSection from '../../../components/common/SupportSection';

const PricingPage = () => {
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
        // "Unlimited Corrections",
        "Name change not allowed"
      ],

      url:"/services/dummy-flights",
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
        // "Unlimited Corrections",
        "Name change not allowed"
      ],
      url:"/services/dummy-hotel",
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
        "Details of the tour for the duration",
        // "Name change not allowed"
      ],

      url:"/services/dummy-flights",
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
      url:"/services/most-preferred",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 pt-16 relative overflow-hidden">
      {/* Enhanced Glassmorphism background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-200/40 to-blue-300/30 rounded-full filter blur-[120px] animate-float-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full filter blur-[110px] animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] bg-gradient-to-l from-indigo-200/30 to-blue-200/30 rounded-full filter blur-[100px] animate-float-fast"></div>
        
        {/* Subtle grid overlay for depth */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.02]"></div>
      </div>

      <Layout className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Heading animate={true} level={1} className="font-bold text-gray-900">
             Pricing
          </Heading>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-600">
            Below prices are per person. <span className="font-medium text-blue-600">Special group discounts</span> available for 4+ travelers.
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl p-4 flex items-start shadow-sm">
            <FaInfoCircle className="flex-shrink-0 mt-1 text-blue-500 mr-3" />
            <p className="text-sm text-blue-800/90">
              <strong>Please Notes:</strong> These itineraries are designed specifically for visa applications and do not constitute actual bookings or confirmations.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <PricingComponent 
          plans={plans}
          showBadge={true}
          buttonText="Get Started"
        />

        {/* Additional Info */}
        {/* Professional Support CTA */}
        <SupportSection />
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

export default PricingPage;