"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { BiMessageDetail, BiSupport, BiCheckShield } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaRegHandshake, FaRegClock, FaCalendarAlt } from "react-icons/fa";
import { AnimatePresence, m, motion } from "framer-motion";
import Image from "next/image";
import VisaRejectionReasons from "@/components/countries/VisaRejectionReasons";
import CountryDetailsBannerHero from "@/components/countries/CoutnryDetailsBannerHero";
import Layout from "@/components/common/Layout";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { PiClockCountdownFill } from "react-icons/pi";
import Footer from "@/components/Layout/Footer";
import { mergeCountryData } from "@/utils/mergeCountryData";
import { countryData } from "@/data/countryData";

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
        const apiResponse = await fetch(`https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLib-zX2S7i5qK5In1NK_6uNuuDCHXZg_Ob91mSseJOLe5mJs6Cmibo9NaksvRHTenjQKPfKrdpc_nnYGVDrDAfNKzSkdJ5OdfRoxNVqSO2NSTOismSN5N0Q-HIcthcSVqLchmFAeUSyStl9dR5K_wCTAS5IXKJCYhOc9Q3OV3tV4p_gDmOmnUEm8tXwgW3I99JOdHnIYm7d0jq8auQ26aQN-icz8e5cdmiUX9U41RUu6Nx_PT8pARbwXQsKv0us2Izgf-ptVxPIzOtmooFBAf_h9ffSKQ&lib=MNOr_3U-ifGUiHYeVYNtbhEhiku5JnKVW`);
        if (!apiResponse.ok) {
          throw new Error("Country not found");
        }
        
        const apiCountries = await apiResponse.json();
     
        // 2. Merge with local data
        const mergedCountries = mergeCountryData(apiCountries);
        console.log("ew",mergedCountries);
        setCountry(mergedCountries.find((c) => c.name.toLowerCase() === slug));
        
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Loading country details...</div>
      </div>
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
    <div className="relative min-h-screen pb-12">
      <Layout>
        <CountryDetailsBannerHero 
          image={country.landmark} 
          title={country.name} 
          altText={country.landmarkName || `${country.name} visa`}
        />

        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          {/* Left Content - Country Details */}
          <div className="lg:w-2/3 space-y-12">
            {/* Visa Information Section - Check all possible data sources */}
            <section className="bg-white">
              <h2 className="text-3xl font-bold pb-2">
                {country.name} Visa Information
              </h2>
              
              <div className="w-[50px] h-[2px] bg-purple-600 mb-6"/>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <MdOutlinePhoneAndroid className="text-5xl bg-purple-100 p-[10px] rounded-lg text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Visa Type</h3>
                    <p className="text-blue-600">
                      {country.visaType || country.basicInfo?.visaType || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <FaCalendarAlt className="text-5xl bg-blue-100 p-[10px] rounded-lg text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Length of Stay</h3>
                    <p>
                      {country.lengthOfStay || country.basicInfo?.lengthOfStay || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="border flex items-center gap-2 border-gray-200 rounded-lg p-4">
                  <PiClockCountdownFill className="text-5xl bg-green-100 p-[10px] rounded-lg text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-0">Validity</h3>
                    <p>
                      {country.validity || country.basicInfo?.validity || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Documents Required Section - Only show if data exists */}
            {country.documentsRequired?.length > 0 && (
              <section className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-3xl font-bold text-gray-800 pb-2">
                  Documents Required
                </h2>
                <div className="w-[50px] h-[2px] bg-purple-600 mb-6"/>
                <div className="space-y-6">
                  {country.documentsRequired.map((doc, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-700">
                        {doc.category}
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {doc.documents.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {country.pdfDownload && (
                  <div className="mt-6">
                    <a 
                      href={country.pdfDownload} 
                      className="bg-blue-600 mx-auto cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 w-fit"
                      download
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="  " clipRule="evenodd" />
                      </svg>
                      Download Document Checklist
                    </a>
                  </div>
                )}
              </section>
            )}

            {/* Rejection Reasons Section - Only show if data exists */}
            {/* {country.rejectionReasons?.length > 0 && (
              <VisaRejectionReasons 
                reasons={country.rejectionReasons} 
                countryName={country.name} 
              />
            )} */}

            {/* FAQs Section - Only show if data exists */}
            {country.faqs?.length > 0 && (
              <section className="bg-white py-6">
              <h2 className="text-3xl font-bold  text-gray-800  pb-2">
                Frequently Asked Questions
              </h2>
              
              <div className="w-[50px] h-[2px] bg-purple-600 mb-6"/>
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
            )}
          </div>

          {/* Right Sidebar - Contact Form (keep your existing form implementation) */}
          <div className="lg:w-1/3 h-fit sticky top-24">
            {/* Your contact form component here */}
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default CountryDetails;