"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { countryData } from "@/data/countryData";
import { BiMessageDetail, BiSupport, BiCheckShield } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaRegHandshake, FaRegClock } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import VisaRejectionReasons from "@/components/countries/VisaRejectionReasons";
import CoutnryDetailsBannerHero from "@/components/countries/CoutnryDetailsBannerHero";
import Layout from "@/components/common/Layout";
import FeedbackReviewComponent from "@/components/home/FeedbackReviewComponent";
import MediaTestimonials from "@/components/home/MediaTestimonials";

const CountryDetails = () => {
  const params = useParams();
  const { category, slug } = params;
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  
  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !isAccepted) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPopup({ show: true, message: "Form submitted successfully!", success: true });
      setFormData({ name: "", email: "", phone: "" });
      setIsAccepted(false);
    } catch (error) {
      setPopup({ show: true, message: "Submission failed. Please try again.", success: false });
    } finally {
      setIsLoading(false);
      setTimeout(() => setPopup({ show: false }), 5000);
    }
  };

  useEffect(() => {
    if (!category || !slug) return;

    const foundCountry = countryData[category]?.find(
      c => c.name.toLowerCase() === slug.toLowerCase()
    );

    if (!foundCountry) {
      router.push("/countries");
    } else {
      setCountry(foundCountry);
    }
  }, [category, slug, router]);

  if (!country) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Loading country details...</div>
      </div>
    );
  }

  return (
    <div className=" relative min-h-screen pb-12">
      {/* Header Section */}
      <Layout className="">
        

        <CoutnryDetailsBannerHero />

        {/* Main Content */}
        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="lg:w-2/3 space-y-12">
            {/* Visa Information Section */}
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Visa Information
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Visa Type</h3>
                  <p className="text-blue-600">{country.basicInfo.visaType}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Length of Stay</h3>
                  <p>{country.basicInfo.lengthOfStay}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Validity</h3>
                  <p>{country.basicInfo.validity}</p>
                </div>
              </div>
            </section>

            {/* Documents Required */}
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Documents Required
              </h2>
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
              <div className="mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Document Checklist
                </button>
              </div>
            </section>

            {/* Rejection Reasons */}
            <VisaRejectionReasons countryName={"australia"} />    

        <FeedbackReviewComponent />
        <MediaTestimonials />

            {/* Why Choose Eazy Visa */}
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Why Choose Eazy Visa?
              </h2>
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
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {country.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <button
                      className="flex justify-between items-center w-full text-left py-3 font-medium text-gray-800"
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
          </div>

          {/* Right Sidebar - Contact Form */}
          <div className="lg:w-1/3 h-fit sticky top-24">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Need Visa Help?</h3>
                <p className="text-gray-600">Get free consultation from our experts</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="+91  9876543210"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAccepted}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the <a href="/terms" className="text-blue-500 hover:underline">terms and conditions</a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !isAccepted}
                  className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${
                    isLoading || !isAccepted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Processing..." : "Get Free Consultation"}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <BiSupport className="mr-2" />
                  Call us: <a href="tel:+918850146905" className="text-blue-500 hover:underline ml-1">+91  88501 46905</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* Success/Failure Popup */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
              popup.success ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryDetails;