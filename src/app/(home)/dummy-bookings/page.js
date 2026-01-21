"use client";
import Layout from '../../../components/common/Layout';
import { Heading, Paragraph } from '../../../components/common/Typography';
import Footer from '../../../components/Layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaInfoCircle, FaCheckCircle, FaPlane, FaHotel, FaFileAlt, FaQuestionCircle, FaWhatsapp, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { MdFlightTakeoff, MdHotel, MdSupportAgent } from 'react-icons/md';
import { HiLightBulb } from 'react-icons/hi';
import PricingComponent from '../../../components/common/PricingComponent';
import SupportSection from '../../../components/common/SupportSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

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
      url: "/services/dummy-flights",
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
      url: "/services/dummy-hotel",
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
      ],
      url: "/services/dummy-flights",
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
      url: "/services/most-preferred",
      popular: true
    }
  ];

  const faqs = [
    {
      question: "Are dummy bookings accepted for visa?",
      answer: "Many visa checklists ask for itinerary/hotel proof, and dummy bookings are commonly used as documentation when formatted properly for a visa file."
    },
    {
      question: "What is a dummy flight ticket?",
      answer: "A dummy flight ticket is a flight reservation/itinerary-style document with a booking reference (PNR-style) used mainly for visa applications and proof of travel intent."
    },
    {
      question: "Can I get a dummy flight + dummy hotel in one package?",
      answer: "Yes, Dummy Bookings is built to bundle both so dates match across your file."
    },
    {
      question: "Is it a real confirmed booking?",
      answer: "No—these are for visa documentation and are not a substitute for a paid ticket/confirmed stay."
    }
  ];

  const whatYouGet = [
    {
      icon: <FaFileAlt className="text-2xl text-blue-600" />,
      title: "Visa-ready PDF format",
      description: "Visa-ready PDF itinerary format (easy to print/upload)."
    },
    {
      icon: <MdFlightTakeoff className="text-2xl text-blue-600" />,
      title: "Dummy Flight Ticket",
      description: "Dummy flight ticket (itinerary / reservation-style document) for your visa file."
    },
    {
      icon: <MdHotel className="text-2xl text-blue-600" />,
      title: "Dummy Hotel Booking",
      description: "Dummy hotel booking option (accommodation proof for the same travel dates)."
    },
    {
      icon: <MdSupportAgent className="text-2xl text-blue-600" />,
      title: "Expert Visa Support",
      description: "Support from visa specialists to pick the right plan and avoid date mismatches."
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Share Details",
      description: "Share traveler details, destination, and travel dates."
    },
    {
      step: "02",
      title: "Choose Your Plan",
      description: "Choose your plan (flight only, hotel only, or flight + hotel bundle)."
    },
    {
      step: "03",
      title: "Receive Documents",
      description: "Receive your documents and align them with your cover letter, insurance, and visa form."
    }
  ];

  const bestFor = [
    "Schengen tourist visas, UK, US, Canada, Japan and more (when an itinerary/hotel proof is asked)",
    "Families and groups who want a consistent itinerary for every traveler",
    "Applicants who want to reduce financial risk before approval"
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* 1. Header & Pricing (Top) */}
      <section className="relative pt-12 lg:pt-16 pb-16 lg:pb-24 overflow-hidden bg-white">
        <Layout>
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                Pricing
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Below prices are per person. <span className="text-blue-600 font-semibold">Special group discounts</span> available for 4+ travelers.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto mb-16 lg:mb-20">
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <FaInfoCircle size={18} />
              </div>
              <p className="text-sm text-blue-900 leading-relaxed font-medium">
                Please Note: These itineraries are designed specifically for visa applications and do not constitute actual bookings or confirmations.
              </p>
            </div>
          </div>

          {/* Pricing Component */}
          <PricingComponent
            plans={plans}
            showBadge={true}
            buttonText="Get Started"
          />
        </Layout>
      </section>

      {/* 2. Intro Section + Best For (Below Pricing) */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <Layout>
          <div className="max-w-5xl mx-auto">
            {/* Content Part */}
            <div className="space-y-12 text-center">
              <div className="space-y-6">
                <Heading level={2} className="text-gray-900 leading-tight">
                  Dummy Bookings for Visa Applications (Flight + Hotel)
                </Heading>
                <div className="max-w-4xl mx-auto space-y-6">
                  <Paragraph className="text-xl text-gray-700 font-medium">
                    Eazy Visas Dummy Bookings helps you create a complete, visa-ready travel plan without buying expensive non‑refundable tickets upfront.
                  </Paragraph>
                  <Paragraph className="text-gray-600">
                    Choose a dummy flight ticket, dummy hotel booking, or a bundled plan so your dates stay consistent across your visa file.
                  </Paragraph>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bestFor.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center gap-6 text-center hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] hover:border-blue-100 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-inner">
                      <FaCheckCircle size={26} />
                    </div>
                    <span className="text-gray-800 font-bold text-base leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="max-w-2xl mx-auto pt-4">
                <div className="inline-flex items-center gap-3 bg-amber-50/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-amber-200/50">
                  <FaInfoCircle className="text-amber-500 text-lg" />
                  <p className="text-xs sm:text-sm text-amber-900 font-medium">
                    These documents are designed for visa documentation and not for boarding or check-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </section>

      {/* 3. What You Get Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <Layout>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[12px] font-bold mb-4 uppercase tracking-wider">
              <FaFileAlt />
              <span>Comprehensive Package</span>
            </div>
            <Heading level={2} className="text-gray-900">What you get with Dummy Bookings</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whatYouGet.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Subtle blue accent bar on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div className="w-16 h-16 bg-blue-50/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 text-blue-600 shadow-sm border border-blue-100/30">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Layout>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-24 bg-blue-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')]"></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <Layout className="relative z-10">
          <div className="text-center mb-20 text-white">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">How it works</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">Your complete visa itinerary in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connection dashes */}
            <div className="hidden lg:block absolute top-[45px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-white/20"></div>

            {howItWorks.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 bg-white text-blue-700 rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-2xl transform group-hover:rotate-6 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-blue-100 text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Layout>
      </section>

      {/* 5. Why Not Real Tickets? Section */}
      <section className="py-24 bg-gray-50">
        <Layout>
          <div className="max-w-6xl mx-auto bg-white rounded-[48px] p-8 md:p-12 shadow-lg border border-gray-100 overflow-hidden relative">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Visual Side */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative rounded-[32px] overflow-hidden shadow-xl border-4 border-white">
                    <Image
                      src="/images/ads-right-hero.webp"
                      alt="Visa Booking illustration"
                      width={500}
                      height={375}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl flex items-center gap-3 border border-white/50">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <FaCheckCircle size={14} />
                      </div>
                      <p className="text-[12px] font-bold text-gray-800 tracking-tight">Embassy Accepted & Travel Verified</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Text Side */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                  Why use dummy bookings instead of real tickets?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                      <FaPlane size={20} />
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Many applicants don&apos;t want to risk paying full airfare before the visa decision. Dummy bookings let you show a realistic plan while staying flexible.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                      <BsCalendarCheck size={20} />
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      This is especially useful when appointments shift or dates are not 100% fixed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </section>

      {/* 6. FAQs Section */}
      <section className="py-24 bg-white">
        <Layout>
          <div className="text-center mb-16">
            <Heading level={2} className="text-gray-900 mb-4">FAQs</Heading>
            <p className="text-gray-600">Answers to common questions about dummy bookings.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-[24px] border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100/50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-transform ${openFaq === index ? 'rotate-180 bg-blue-600 text-white' : 'bg-white text-gray-400'}`}>
                    <FaChevronDown size={14} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 pt-2">
                        <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Layout>
      </section>

      {/* 7. CTA Block (Bottom) - Smaller, same as footer */}
      <section className="py-12 lg:py-16">
        <Layout>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-500 rounded-2xl px-8 py-10 lg:py-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need help choosing the right plan?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Our visa specialists can recommend the best dummy booking plan based on your destination and timeline.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/dummy-bookings"
                className="bg-white text-primary-500 px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FaPlane />
                Get Dummy Bookings
              </Link>
              <Link
                href="https://wa.me/918850146905"
                target="_blank"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-lg" />
                Talk to a Visa Expert
              </Link>
            </div>
          </motion.div>
        </Layout>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;