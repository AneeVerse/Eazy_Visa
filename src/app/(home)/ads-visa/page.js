"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaPhoneAlt, FaWhatsapp, FaPlane, FaHotel, FaShieldAlt, FaFilePdf, FaEdit, FaTimes, FaUserTie, FaGlobe, FaClock, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ConsultationForm from "../../../components/common/ConsultationForm";
import { FcGoogle } from "react-icons/fc";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import AdsVisaHero from '../../../components/adsVisa/AdsVisaHero';
import CountryCardsSection from '../../../components/adsVisa/CountryCardsSection';
import Button from '../../../components/common/Button';

const AdsVisaPage = () => {
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
    router.push(`/ads-visa/bookings?type=${normalizedType}`);
  };

  // Function to scroll to country cards section
  const scrollToCountryCards = useCallback(() => {
    const countrySection = document.getElementById('country-cards-section');
    if (countrySection) {
      countrySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Function to scroll to booking form (redirect to dedicated page)
  const scrollToBookingForm = useCallback(() => {
    scrollToCountryCards();
  }, [scrollToCountryCards]);

  // Listen for Get Started button clicks from navbar
  useEffect(() => {
    const handleGetStartedClick = (event) => {
      // Only handle on this specific page
      if (window.location.pathname === '/ads-visa') {
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
  }, [scrollToBookingForm]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* New Hero Section */}
      <AdsVisaHero onBookingClick={scrollToCountryCards} />

      {/* Feature Cards Section */}
      <div className="relative z-30 bg-white pt-8 pb-8">
        {/* Container matching price cards alignment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">Eazy Visas?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Clear guidance for visa applicants, simple, structured, and responsive.
            </p>
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
                  <FaUserTie className="text-blue-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Expert Consultants</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">Get guidance from experienced consultants who explain each step in plain language.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaGlobe className="text-green-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Multi‑Country Experience</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">Consultation support for UK, US, Schengen (Europe), and Australia travel cases.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaClock className="text-purple-500 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Quick Response</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">Fast replies and clear next steps so you don&apos;t lose time due to confusion or back‑and‑forth.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="flex-shrink-0 w-72 snap-center flex flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-center">
                  <FaWhatsapp className="text-green-600 text-3xl mb-4 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">WhatsApp Support</h4>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">WhatsApp support for quick clarifications while you prepare and submit your application.</p>
                </div>
              </motion.div>
            </div>

            {/* Desktop/Tablet grid layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaUserTie className="text-blue-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Expert Consultants</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">10+ years of experience with expert visa consultants guiding you through the entire application process from start to approval.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaGlobe className="text-green-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">100+ Countries</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Visa assistance for 100+ destinations worldwide (including UK, USA, Schengen/Europe, and Australia).</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaClock className="text-purple-500 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">Fast Processing</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Quick turnaround and priority coordination so your documents can be verified and submitted without avoidable delays.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden sm:flex h-full flex-col bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center">
                <FaWhatsapp className="text-green-600 text-3xl mb-4 mx-auto" />
                <h4 className="font-semibold text-gray-900 mb-3 text-center">24/7 WhatsApp Support</h4>
                <p className="text-gray-600 text-sm text-center leading-relaxed">Instant WhatsApp support anytime, anywhere. Get quick replies and guidance whenever you need help.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white pt-0 lg:pt-4 pb-4 mb-16">
        {/* Country Cards Section */}
        <CountryCardsSection />





        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                See What Our <span className="text-blue-500">Clients</span> Say
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
        <section className="min-h-screen relative py-4 sm:py-8 lg:py-12 overflow-hidden mb-6 lg:-mb-50">
          <div className="absolute blur-[200px] top-0 left-0 -z-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-white opacity-50 -translate-x-1/2 -translate-y-1/4"></div>

          <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-4 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">Our Story</h2>
            </div>

            {/* Mission Section */}
            <div className="mb-0 px-4">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-indigo-100" style={{ boxShadow: '0 -25px 50px -12px rgba(99, 102, 241, 0.25), 0 25px 50px -12px rgba(99, 102, 241, 0.25)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
                  {/* Left Side: Text Only */}
                  <div className="order-2 md:order-1">
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                      Visa applications feel stressful because requirements vary and small mistakes can cause delays. We built Eazy Visas to simplify the journey with clear guidance, practical checklists, and responsive support. If you&apos;re unsure what applies to your case, we help you understand the process and prepare with confidence without overpromising results.
                    </p>
                  </div>

                  {/* Right Side: Logo */}
                  <div className="order-1 md:order-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 min-h-[220px] sm:min-h-[260px] md:h-full flex items-center justify-center">
                    <Image
                      src="/logo/logo-white.png"
                      alt="Eazy Visas Logo"
                      width={200}
                      height={80}
                      className="w-auto h-16 sm:h-20 md:h-24 max-w-full"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>









        {/* Help Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto mb-4 sm:mb-6 lg:-mb-8 -mt-4 sm:-mt-6">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full opacity-50"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-5 lg:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
                {/* Left Content */}
                <div className="flex-1 text-white w-full lg:w-auto">
                  {/* Title and Description */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-center lg:text-left">Need Help Choosing?</h3>
                    <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed text-center lg:text-left max-w-2xl">
                      Our consultants can help you pick the right visa type and next steps based on your destination and purpose of travel.
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-4 text-center lg:text-left">
                    <p className="text-white font-semibold text-sm sm:text-base mb-1">Get In Touch</p>
                    <p className="text-blue-100 text-xs sm:text-sm">Email: info@eazyvisas.com & Phone: +918850146905</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
                    <a
                      href="https://wa.me/918850146905"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base min-w-[140px]"
                    >
                      <FaWhatsapp className="mr-2" />
                      Chat with us
                    </a>
                    <a
                      href="tel:+918850146905"
                      className="inline-flex items-center justify-center px-5 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 border-2 border-white shadow-lg hover:shadow-xl text-sm sm:text-base min-w-[140px]"
                    >
                      <FaPhoneAlt className="mr-2" />
                      Call Support
                    </a>
                  </div>
                </div>

                {/* Right Icon - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:flex flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 xl:w-24 xl:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <FaPlane className="text-blue-600 text-3xl xl:text-4xl transform rotate-12" />
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
        </div>

      </div>

      <Footer className="relative z-10" showDisclaimer={true} />

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

export default AdsVisaPage;

