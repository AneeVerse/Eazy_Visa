"use client";
import Layout from '@/components/common/Layout';
import { Heading } from '@/components/common/Typography';
import Footer from '@/components/Layout/Footer';
import Link from 'next/link';
import { FaCheck, FaInfoCircle, FaCrown, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const PricingPage = () => {
  const plans = [
    {
      name: "Flight Itinerary",
      description: "24 Hours Delivery",
      price: "999",
      billing: "per person",
      note: "*Name change not allowed",
      features: [
        "24 Hours Delivery",
        "Unlimited Flights",
        "Unlimited Corrections",
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
      note: "*Name change not allowed",
      features: [
        "24 Hours Delivery",
        "Verifiable Hotel Confirmation",
        "Unlimited Corrections",
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
      note: "*Name change not allowed",
      features: [
        "24 Hours Delivery",
        "Day wise Sightseeing",
        "Details of the tour for the duration",
        "Name change not allowed"
      ],

      url:"/services/dummy-hotel",
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
      url:"/services/dummy-flights",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 pt-16 relative overflow-hidden">
      {/* Enhanced Glassmorphism background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl backdrop-blur-sm bg-white/70 border border-white/30 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${plan.popular ? 'ring-2 ring-blue-500/50 shadow-blue-100/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                    <p className="text-gray-600 text-sm font-medium mb-5">{plan.description}</p>
                  </div>
                  {plan.popular && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FaCrown className="mr-1" /> Popular
                    </span>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{plan.price}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{plan.billing}</p>
                  {plan.note && <p className={`${plan.popular ? " font-semibold ": " "} text-xs text-gray-500/90 mt-1`}>{plan.note}</p>}
                </div>
                
                <Link href={plan.url} className={`w-full block text-center py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 mb-6 shadow-sm
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md' 
                    : 'bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  Get Started
                </Link>
              </div>
              
              <div className="border-t border-gray-200/50 px-6 pt-5 pb-6 bg-white/30">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What&apos;s included:</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 mr-2 mt-0.5 flex items-center justify-center rounded-full 
                       bg-blue-100 text-blue-600 `}>
                        <FaCheck className="h-3 w-3" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {/* Professional Support CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-8 shadow-sm max-w-4xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Need help choosing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our visa specialists are available to help you select the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+918850146905" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaPhoneAlt className="mr-2" /> Call Support
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FaEnvelope className="mr-2" /> Contact Us
              </Link>
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

export default PricingPage;