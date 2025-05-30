"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { BiMessageDetail, BiSupport, BiCheckShield } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaRegHandshake, FaRegClock, FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, m, motion } from "framer-motion";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { PiClockCountdownFill } from 'react-icons/pi';
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaInfoCircle, FaCrown, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import VisaRejectionReasons from "../../../../../components/countries/VisaRejectionReasons";
import CountryDetailsBannerHero from "../../../../../components/countries/CoutnryDetailsBannerHero";
import Layout from "../../../../../components/common/Layout";
import CountryCard from "../../../../../components/cards/CountryCard";
import CountryCardSkeleton from "../../../../../components/common/CountryCardSkeleton";
import Footer from "../../../../../components/Layout/Footer";
import { mergeCountryData } from "../../../../../utils/mergeCountryData";
import { countryData } from "../../../../../data/countryData";
import FeedbackReviewComponent from "../../../../../components/home/FeedbackReviewComponent";
import MediaTestimonials from "../../../../../components/home/MediaTestimonials";
import FormComponent from "../../../../../components/common/FormComponent";
import CountryDetailsSkeleton from "../../../../../components/countries/CountryDetailsSkeleton";
import CountryVisaSolution from "../../../../../components/countries/CountryVisaSolution";
import CountryDetailsServicesVisaSolution from "../../../../../components/countries/CountryDetailsServicesVisaSolution";
import PopupForm from "../../../../../components/common/PopupForm";

const CountryDetails = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { category, slug } = params;
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // First check for direct data in query params (from VisaCard)
        const queryData = searchParams.get('data');
        if (queryData) {
          setCountry(JSON.parse(queryData));
          setLoading(false);
          return;
        }

        // If no query data, fetch from API
        // const apiResponse = await fetch(`https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiuocZL1cdh3YcGZtMrTwV2qgH2lVwfnXvgoCN8GRiZi_vNzLgl72Aapcc1xp-vWyLUH0dW5aFQ9cyu1lCJlRaUkT9IBrwlN1yVMCmnywQkEjgw274NttmfXmJIKv_6IXJyI6NQPYLJ7ORTpd7D3t9-m1TrsZplXiYpXANnDqitJe43t3x-hP3Vrn0sNva5z0oh32avJb6Deyb8xl83Da9eMpfIsExJd8EpO00zbnmt1VxWt7pQiQypkuxJrRRi_qwjJWr0bbbKOCFRjmk--tz7keYrJA&lib=MNOr_3U-ifGUiHYeVYNtbhEhiku5JnKVW`,)

        //   ;
        // if (!apiResponse.ok) {
        //   throw new Error("Country not found");
        // }

        // const apiCountries = await apiResponse.json();
        // console.log("API Countries:", apiCountries);

        setCountry(countryData.find((c) => c.name.toLowerCase().replace(" ","") === slug));

      } catch (error) {
        console.error("Error fetching country data:", error);
        // Don't redirect - show error state
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCountryData();
    }
  }, [slug, searchParams]);

  if (loading) {
    return (
      <Layout>

     <CountryDetailsSkeleton />
      </Layout>
    );
  }

  if (!country) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">
          Country data not available. <button
            onClick={() => router.push('/countries')}
            className="text-blue-500 hover:underline"
          >
            Browse all countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" relative min-h-screen">
      
      {/* Header Section */}


        <CountryDetailsBannerHero image={country.landmark} title={country.name} />

      <Layout className="">
        {/* Main Content */}
        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="lg:w-2/3 space-y-12">
            {/* Visa Information Section */}
            <section className="">
              <h2 className="text-3xl font-bold  pb-2">
                {country.name}  Visa Information
              </h2>
              <div className="w-[50px] h-[2px] bg-purple-600 mb-6" />
              <div className="grid md:grid-cols-2  gap-6">
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <MdOutlinePhoneAndroid className="text-5xl bg-purple-100 p-[10px] rounded-lg text-purple-600" />
                  <div>

                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Visa Type</h3>
                    <p className="text-blue-600">{country.visaType}</p>
                  </div>
                </div>
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <FaCalendarAlt className="text-5xl bg-blue-100 p-[10px] rounded-lg text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Length of Stay</h3>
                    <p>{country.lengthOfStay}</p>
                  </div>
                </div>
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <PiClockCountdownFill className="text-5xl bg-green-100 p-[10px] rounded-lg text-green-600" />
                  <div>

                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Validity</h3>
                    <p>{country.validity}</p>
                  </div>
                </div>
                {/* visa fees */}
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <GiTakeMyMoney className="text-5xl bg-yellow-100 p-[10px] rounded-lg text-yellow-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Visa Fees</h3>
                    <p className="text-blue-600">₹ {country.price.toLocaleString()}</p>
                    </div>
                    </div>
              </div>
            </section>
            {/* add section chat with Us with  Whatsapp icon */}
            <a
                  href={`https://wa.me/+918850146905?text=Hi, I have a query regarding ${country.name} visa.`}
                  target="_blank"
                  rel="noopener noreferrer"

                  className="bg-green-500 text-white gap-2 mx-auto items-center flex justify-center max-w-[200px] sm:hidden py-3 rounded-lg hover:bg-green-600 transition"
                >
                  <FaWhatsapp className="text-2xl self-center" />
                  <div className="self-center">Chat with Us</div>
                </a>

            {/* Documents Required */}
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-gray-800 pb-2">
                Documents Required
              </h2>

              <div className="w-[50px] h-[2px] bg-purple-600 mb-6" />
              <div className="space-y-6">
                {country.documentsRequired.map((doc, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-700">{doc.category}</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      {doc.documents.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            <div className="mt-6">
              <button className="bg-blue-600 mx-auto cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Document Checklist
              </button>
            </div>

            {/* Rejection Reasons */}
            <VisaRejectionReasons reasons={country.rejectionReasons} countryName={country.name} />

            <FeedbackReviewComponent />
            {/* <MediaTestimonials /> */}

            {/* Why Choose Eazy Visas */}
            <section className="bg-white py-6  ">
              <h2 className="text-3xl font-bold text-gray-800  pb-2">
                Why Choose Eazy Visas?
              </h2>

              <div className="w-[50px] h-[2px] bg-purple-600 mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <BiCheckShield className="text-4xl text-blue-500" />,
                    title: "98% Success Rate",
                    description: "Highest visa approval ratio in the industry"
                  },
                  {
                    icon: <FaRegClock className="text-4xl text-blue-500" />,
                    title: "Fast Processing",
                    description: "Get your visa faster than standard processing"
                  },
                  {
                    icon: <BiSupport className="text-4xl text-blue-500" />,
                    title: "Expert Guidance",
                    description: "Dedicated visa consultants for each application"
                  },
                  {
                    icon: <FaRegHandshake className="text-4xl text-blue-500" />,
                    title: "Trusted Service",
                    description: "10,000+ satisfied customers worldwide"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                    <div className="mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white py-6">
              <h2 className="text-3xl font-bold  text-gray-800  pb-2">
                Frequently Asked Questions
              </h2>

              <div className="w-[50px] h-[2px] bg-purple-600 mb-6" />
              <div className="space-y-4">
                {country.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <button
                      className="flex cursor-pointer justify-between items-center w-full text-left py-3 font-medium text-gray-800"
                      onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                    >
                      <span>{faq.question}</span>
                      {expandedFaqIndex === index ? (
                        <AiOutlineMinus className="text-blue-500" />
                      ) : (
                        <AiOutlinePlus className="text-blue-500" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedFaqIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 mt-2 pb-2">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            <CountryDetailsServicesVisaSolution/>
          </div>

          {/* Right Sidebar - Contact Form */}
          <div className="lg:w-1/3 h-fit sticky top-24">
            <div className="sticky top-24  ">
              <FormComponent />
            </div>
          </div>
        </div>
      </Layout>


      <Footer />
      <div className="block sm:hidden">
      <PopupForm/>
      </div>
    </div>
  );
};

export default CountryDetails;