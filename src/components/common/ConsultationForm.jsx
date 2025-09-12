"use client";

import { useState } from "react";
import { BiSupport, BiUser, BiEnvelope, BiPhone, BiCheckShield } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { RiVisaLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountryCodeDropdown from './CountryCodeDropdown';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "",
    countryCode: "+91", // Default to India
    visaType: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "",
    visaType: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCountryCodeChange = (code) => {
    setFormData({
      ...formData,
      countryCode: code
    });
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const validateForm = () => {
    const newErrors = { firstName: "", lastName: "", email: "", phone: "", visaType: "" };
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
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
    if (!formData.visaType) {
      newErrors.visaType = "Visa Type is required";
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
      // Combine country code with phone number (with space)
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
      
      // For Google Sheets compatibility, also create a version without special characters
      const googleSheetsPhone = `${formData.countryCode.replace('+', '')}${formData.phone}`;
      
      const response = await fetch('/api/submit-visa-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: fullPhoneNumber, // Send the complete phone number with country code for email
          googleSheetsPhone: googleSheetsPhone, // Send clean version for Google Sheets
          visaType: formData.visaType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      // Set flag in sessionStorage before redirecting
      sessionStorage.setItem('formSubmitted', 'true');
      
      // Redirect to thank you page
      window.location.href = '/visa-confirmation';
      
    } catch (error) {
      toast.error(error.message || "Submission failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        className={"mt-[70px]"}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all">
        {/* Form Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10 flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <RiVisaLine className="text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Visa Consultation</h3>
              <p className="text-sm opacity-90 mt-1">Get expert guidance for your visa application</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BiUser className="mr-2 text-blue-500" />
                First Name*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="John"
                />
                <BiUser className="absolute left-3 top-4 text-gray-400" />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BiUser className="mr-2 text-blue-500" />
                Last Name*
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Doe"
                />
                <BiUser className="absolute left-3 top-4 text-gray-400" />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BiEnvelope className="mr-2 text-blue-500" />
                Email Address*
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="your@email.com"
                />
                <BiEnvelope className="absolute left-3 top-4 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BiPhone className="mr-2 self-center text-blue-500" />
                Phone Number*
              </label>
              <div className="flex">
                <CountryCodeDropdown
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  error={errors.phone}
                  height="h-12"
                  borderColor="border-gray-300"
                />
                <div className="relative flex-1">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border border-l-0 rounded-r-lg ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="9876543210"
                  />
                  <BiPhone className="absolute left-3 top-4 text-gray-400" />
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Visa Type Dropdown */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BiSupport className="mr-2 text-blue-500" />
                Visa Type*
              </label>
              <div className="relative">
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.visaType ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                >
                  <option value="">Select Visa Type</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Business Visa">Business Visa</option>
                  <option value="Student Visa">Student Visa</option>
                  {/* Add more options as needed */}
                </select>
                {/* You can add an icon here if you want, e.g. <BiChevronDown /> */}
              </div>
              {errors.visaType && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.visaType}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isAccepted}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </div>
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
                <div className="flex items-center">
                  <BiCheckShield className="text-blue-500 mr-1 self-center" />
                  I agreed to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline ml-1">
                    terms and conditions
                  </a>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !isAccepted}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className={`w-full mt-6 py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                isLoading || !isAccepted
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
              } transition-all duration-300`}
            >
              <span>{isLoading ? "Processing..." : "Get Free Consultation"}</span>
              {!isLoading && <FiArrowRight className="text-lg" />}
            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConsultationForm;