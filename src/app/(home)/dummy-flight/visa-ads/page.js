"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../../components/common/Layout';
import Footer from '../../../../components/Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaPhoneAlt, FaWhatsapp, FaPlane, FaHotel, FaShieldAlt, FaFilePdf, FaEdit, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ConsultationForm from "../../../../components/common/ConsultationForm";
import { FcGoogle } from "react-icons/fc";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import HeroBookingSection from '../../../../components/dummyFlight/HeroBookingSection';
import Button from '../../../../components/common/Button';

const DummyFlightBookingsAdsPage = () => {
  const router = useRouter();

  // Auto-scroll states for testimonials
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality for testimonials
  useEffect(() => {
    const container = document.getElementById('review-carousel');
    if (!container) return;

    let animationId;
    let lastTimestamp = 0;
    const scrollSpeed = 0.8; // Scroll speed

    const autoScroll = (timestamp) => {
      if (isPaused) {
        animationId = requestAnimationFrame(autoScroll);
        return;
      }

      if (timestamp - lastTimestamp >= 16) { // ~60fps
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Check if we can actually scroll (has overflow content)
        if (maxScroll <= 0) {
          animationId = requestAnimationFrame(autoScroll);
          return;
        }

        if (container.scrollLeft >= maxScroll - 1) { // Small buffer to prevent stuck
          // Smooth reset to beginning with a small delay
          setTimeout(() => {
            if (container) {
              container.scrollLeft = 0;
            }
          }, 1000); // 1 second pause before reset
          // Pause briefly during reset
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 1500);
        } else {
          container.scrollLeft += scrollSpeed;
        }

        lastTimestamp = timestamp;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll
    animationId = requestAnimationFrame(autoScroll);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const goToBookingPage = (targetType = 'flight') => {
    const normalizedType = targetType === 'both' ? 'most-preferred' : targetType;
    router.push(`/dummy-flight/visa-ads/bookings?type=${normalizedType}`);
  };

  // Function to scroll to pricing section
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Function to scroll to booking form (redirect to dedicated page)
  const scrollToBookingForm = () => {
    scrollToPricing();
  };

  // Listen for Get Started button clicks from navbar
  useEffect(() => {
    const handleGetStartedClick = (event) => {
      // Only handle on this specific page
      if (window.location.pathname === '/dummy-flight/visa-ads') {
        event.preventDefault();
        scrollToBookingForm();
      }
    };

    // Listen for custom event from navbar Get Started button
    const handleNavbarGetStarted = () => {
      scrollToBookingForm();
    };

    // Add event listener for custom event
    window.addEventListener('navbarGetStartedClick', handleNavbarGetStarted);

    // Also listen for clicks on any element with get-started class or data attribute
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-action="get-started"]') ||
        e.target.matches('.get-started-btn') ||
        e.target.textContent?.trim() === 'Get Started') {
        handleGetStartedClick(e);
      }
    });

    return () => {
      window.removeEventListener('navbarGetStartedClick', handleNavbarGetStarted);
    };
  }, []);

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

  const handleBookingClick = (planOrType) => {
    if (!planOrType) {
      goToBookingPage('flight');
      return;
    }

    if (typeof planOrType === 'string') {
      goToBookingPage(planOrType);
      return;
    }

    const planType =
      planOrType.name === 'Most Preferred' || planOrType.type === 'both'
        ? 'most-preferred'
        : planOrType.type || 'flight';

    goToBookingPage(planType);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* New Hero Section */}
      <HeroBookingSection onBookingClick={scrollToPricing} />

      {/* Feature Cards Section */}
      <div className="relative z-30 bg-white pt-8 pb-8">
        {/* Container matching price cards alignment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Reason to use our service?
            </h2>

          </div>

          {/* Scrollable container on mobile, grid on larger screens */}
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto lg:px-0">
            {/* Mobile horizontal scroll container */}
            <div className="flex overflow-x-auto gap-4 pb-4 sm:hidden scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaShieldAlt className="text-green-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Legitimate & Verifiable</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">Book legitimate and verifiable flight tickets and hotel reservations for your visa applications. All our documents are authentic and can be verified.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaFilePdf className="text-blue-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Instant PDF</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">Instantly download PDF confirmations for your bookings. Get your dummy tickets delivered within minutes of payment confirmation.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaEdit className="text-purple-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Unlimited Revisions</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">Unlimited date revisions, if you happen to change your travel schedule. We understand plans can change and we&apos;re here to help.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaTimes className="text-red-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">No Cancellation Fee</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">No hidden charges or cancellation fees involved. What you see is what you pay - transparent pricing with no surprises.</p>
                </div>
              </motion.div>
            </div>

            {/* Desktop/Tablet grid layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaShieldAlt className="text-green-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Legitimate & Verifiable</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Book legitimate and verifiable flight tickets and hotel reservations for your visa applications. All our documents are authentic and can be verified.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaFilePdf className="text-blue-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Instant PDF</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Instantly download PDF confirmations for your bookings. Get your dummy tickets delivered within minutes of payment confirmation.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaEdit className="text-purple-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Unlimited Revisions</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Unlimited date revisions, if you happen to change your travel schedule. We understand plans can change and we&apos;re here to help.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaTimes className="text-red-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">No Cancellation Fee</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">No hidden charges or cancellation fees involved. What you see is what you pay - transparent pricing with no surprises.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Layout className="relative z-20 bg-white pt-0 lg:pt-4 pb-4 mb-16">

        {/* CTA Section - Moved above pricing */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 sm:mb-22 mt-12 sm:mt-16 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Your Visa Documents?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Start your visa application process today with our reliable and verifiable dummy bookings. Trusted by thousands of successful visa applicants worldwide.
          </p>
        </div>

        {/* Pricing Cards Section - Moved up to accommodate floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 sm:mt-6 lg:mt-8 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-0"
          id="pricing-section"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 sm:gap-y-8 lg:gap-12 max-w-7xl mx-auto">

            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl backdrop-blur-sm bg-white/70 border border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-[500px] w-full max-w-sm mx-auto
                  ${plan.popular ? 'ring-2 ring-blue-500/50' : ''}
                  shadow-[0_8px_30px_rgba(0,0,0,0.12),0_-8px_30px_rgba(0,0,0,0.12)] md:shadow-[0_-8px_30px_rgba(0,0,0,0.08)]`}
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
                    style={{ "color": `${plan.popular ? "#0B82E6" : ""}` }}
                    className={`${plan.note != "" ? " mt-[-6px]  " : " hidden "}text-black mb-5 font-semibold text-[12px]`}
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





        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                See What Our <span className="text-blue-500">Happy Clients</span> Say
              </h2>
            </div>

            {/* Google Rating Summary */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center mb-1">
                <FcGoogle size={32} className="mr-2" />
                <span className="text-2xl font-semibold text-gray-800">Excellent on Google</span>
              </div>
              <div className="text-lg font-medium text-gray-700">5.0 out of 5 based on 50 reviews</div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
            </div>

            {/* Reviews Carousel */}
            <div className="relative">
              {/* Left scroll button */}
              <button
                onClick={() => {
                  setIsPaused(true);
                  const container = document.getElementById('review-carousel');
                  if (container) {
                    container.scrollBy({ left: -350, behavior: 'smooth' });
                    // Resume auto-scroll after manual scroll completes
                    setTimeout(() => setIsPaused(false), 1000);
                  }
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md text-blue-500 h-10 w-10 rounded-full hidden md:flex items-center justify-center z-10 hover:bg-blue-50 transition-colors"
              >
                <FaAngleLeft size={22} />
              </button>

              {/* Carousel container */}
              <div
                id="review-carousel"
                className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {[
                  {
                    name: "macsen jose",
                    image: "/images/review/macsen jose.png",
                    date: "16 days ago",
                    text: "Had taken Shaheens assistance from EazyVisas and it was a smooth process. Highly recommended!"
                  },
                  {
                    name: "Aditya Bhardwaj",
                    image: "/images/review/Aditya Bhardwaj.png",
                    date: "2 weeks ago",
                    text: "Very professional and prompt service. Got my visa without any hassle. Thank you!"
                  },
                  {
                    name: "Mozammil Khan",
                    image: "/images/review/Mozammil Khan.png",
                    date: "1 week ago",
                    text: "Great experience! The team was very supportive throughout the process."
                  },
                  {
                    name: "Ramachandran",
                    image: "/images/review/Ramachandran R S.png",
                    date: "3 weeks ago",
                    text: "Very helpful and efficient service. Highly recommend EazyVisas!"
                  },
                  {
                    name: "SHUBHAM JAIN",
                    image: "/images/review/SHUBHAM JAIN.png",
                    date: "2 weeks ago",
                    text: "Quick response and very professional. Got my visa on time. Thank you!"
                  }
                ].map((review, idx) => (
                  <div
                    key={review.name}
                    className="bg-white rounded-xl shadow-md p-4 flex-shrink-0 flex flex-col justify-between hover:shadow-lg transition-shadow w-[280px] max-w-[90vw] min-h-[200px]"
                  >
                    <div className="flex items-center mb-3">
                      <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">★</span>
                      ))}
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed">{review.text}</div>
                  </div>
                ))}
              </div>

              {/* Right scroll button */}
              <button
                onClick={() => {
                  setIsPaused(true);
                  const container = document.getElementById('review-carousel');
                  if (container) {
                    container.scrollBy({ left: 350, behavior: 'smooth' });
                    // Resume auto-scroll after manual scroll completes
                    setTimeout(() => setIsPaused(false), 1000);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md text-blue-500 h-10 w-10 rounded-full hidden md:flex items-center justify-center z-10 hover:bg-blue-50 transition-colors"
              >
                <FaAngleRight size={22} />
              </button>
            </div>
          </div>
        </section>



        {/* About Section */}
        <section className="min-h-screen relative py-4 sm:py-8 lg:py-12 overflow-hidden mb-12">
          <div className="absolute blur-[200px] top-0 left-0 -z-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-white opacity-50 -translate-x-1/2 -translate-y-1/4"></div>

          <Layout>
            {/* Hero Section */}
            <div className="text-center mb-4 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">Our Story</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Pioneering in solving complex visa application processes and simplifying them for end customers
              </p>
            </div>

            {/* Mission Section */}
            <div className="mb-6 sm:mb-8 lg:mb-12 px-4">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-indigo-100" style={{ boxShadow: '0 -25px 50px -12px rgba(99, 102, 241, 0.25), 0 25px 50px -12px rgba(99, 102, 241, 0.25)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
                  {/* Left Side: Text Only */}
                  <div className="order-2 md:order-1">
                    <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                      Eazy Visas is a one stop shop for all your Visa documentation woes. We understand arranging documents for your visa application can be stressful. While your financials may be in place and you may feel confident about your visa application, there is still a possibility for your application to get rejected. In such a situation the flight tickets and hotel bookings are gone for a waste. Barring a huge loss in penalty charged by the Airline or the Hotel or the Travel Agent.
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                      However, what most people are unaware of is that the Embassy does not advise you to book a confirmed ticket or hotel booking. All they want is a flight itinerary and hotel booking along with a day wise itinerary to show that you have every intention of visiting their country and would be returning home.
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                      Our Flight itineraries, Hotel bookings, Day wise itinerary and Insurance policies are 100% verifiable and our customers have been successful in getting their visa application approved.
                    </p>
                  </div>

                  {/* Right Side: Logo */}
                  <div className="order-1 md:order-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 min-h-[150px] sm:min-h-[180px] md:h-full flex items-center justify-center">
                    <Image
                      src="/logo/logo-white.png"
                      alt="Eazy Visas Logo"
                      width={200}
                      height={80}
                      className="w-auto h-10 sm:h-14 md:h-16 max-w-full"
                    />
                  </div>
                </div>

                {/* Button Group - Left aligned below */}
                <div className="flex flex-row gap-3 sm:gap-4 justify-start mt-6 sm:mt-8">
                  <Button
                    onClick={scrollToPricing}
                    className="flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-1 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-xs sm:text-base w-[85px] sm:w-auto"
                  >
                    Book Flight
                  </Button>
                  <Button
                    onClick={scrollToPricing}
                    className="flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-1 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-xs sm:text-base w-[85px] sm:w-auto"
                  >
                    Book Hotels
                  </Button>
                </div>
              </div>
            </div>
          </Layout>
        </section>












        {/* Help Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto mb-4 sm:mb-6 lg:-mb-8 -mt-16">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
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
                  <p className="text-blue-100 text-xs sm:text-sm lg:text-base">Email: info@eazyvisas.com & Phone: +918850146905</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="https://wa.me/918850146905"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg text-sm lg:text-base"
                  >
                    <FaWhatsapp className="mr-2" />
                    Chat with us
                  </a>
                  <a
                    href="tel:+918850146905"
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