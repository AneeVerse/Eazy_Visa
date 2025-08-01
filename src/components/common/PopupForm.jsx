"use client";

import { useState, useEffect } from 'react';
import { BiSupport, BiUser, BiEnvelope, BiPhone, BiCheckShield, BiWorld, BiTask, BiX } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopupForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    visaType: '',
    formSource: 'homepage'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  // Sample options for dropdowns
  const visaTypes = [
    "Tourist Visa",
    "Business Visa",
  ];


  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "Indonesia",
    "India",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.visaType) {
      newErrors.visaType = 'Please select a visa type';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAccepted) {
      toast.error('Please accept the terms and conditions', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      sessionStorage.setItem('formSubmitted', 'true');
      window.location.href = '/dummy-booking-confirmation';
      
    } catch (error) {
      toast.error(error.message || 'Failed to submit form. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

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
      
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[4px] bg-opacity-20 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col lg:flex-row">
          {/* Close Button */}
          <button 
            onClick={closePopup}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <BiX className="text-2xl md:text-4xl bg-white rounded-full p-1" />
          </button>
          
          {/* Image Section - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:block lg:w-1/3 bg-blue-600 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-500 opacity-90"></div>
            <div className="relative h-full p-8 flex flex-col justify-center text-white">
              <h3 className="text-2xl font-bold mb-4">Need Visa Assistance?</h3>
              <p className="mb-6">Our experts will guide you through the entire visa application process.</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="p-2 bg-white/20 rounded-full mr-3">
                    <BiCheckShield className="text-lg" />
                  </div>
                  <span>100% Secure Process</span>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-white/20 rounded-full mr-3">
                    <BiSupport className="text-lg" />
                  </div>
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-white/20 rounded-full mr-3">
                    <BiTask className="text-lg" />
                  </div>
                  <span>High Success Rate</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="lg:w-2/3 p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Free Visa Consultation</h3>
              <p className="text-gray-600 hidden lg:block">Fill out the form and our expert will contact you shortly</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <BiUser className="mr-2 text-blue-500 text-sm" />
                    First Name*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="John"
                    />
                    <BiUser className="absolute left-3 top-3 text-gray-400 text-sm" />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <BiUser className="mr-2 text-blue-500 text-sm" />
                    Last Name*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Doe"
                    />
                    <BiUser className="absolute left-3 top-3 text-gray-400 text-sm" />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <BiEnvelope className="mr-2 text-blue-500 text-sm" />
                  Email Address*
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="your@email.com"
                  />
                  <BiEnvelope className="absolute left-3 top-3 text-gray-400 text-sm" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <BiPhone className="mr-2 text-blue-500 text-sm" />
                  Phone Number*
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="9876543210"
                  />
                  <BiPhone className="absolute left-3 top-3 text-gray-400 text-sm" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Visa Type Field */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <BiTask className="mr-2 text-blue-500 text-sm" />
                  Visa Type*
                </label>
                <div className="relative">
                  <select
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-8 py-2 text-sm border rounded-lg appearance-none ${
                      errors.visaType ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  >
                    <option value="">Select Visa Type</option>
                    {visaTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  <BiTask className="absolute left-3 top-3 text-gray-400 text-sm" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.visaType && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.visaType}
                  </p>
                )}
              </div>

              {/* Country Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <BiWorld className="mr-2 text-blue-500 text-sm" />
                  Destination Country*
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-8 py-2 text-sm border rounded-lg appearance-none ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </select>
                  <BiWorld className="absolute left-3 top-3 text-gray-400 text-sm" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-1">
                <div className="flex items-center h-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAccepted}
                    onChange={handleCheckboxChange}
                    className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                  <div className="flex items-center">
                    <BiCheckShield className="text-blue-500 mr-1 text-xs" />
                    <div>
                    I agreed to the{" "}
                    <a href="/terms" className="text-blue-600 hover:underline ml-0.5">
                      terms and conditions
                    </a></div>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !isAccepted}
                className={`w-full mt-4 py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 ${
                  isLoading || !isAccepted
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
                } transition-all duration-300`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Get Free Consultation</span>
                    <FiArrowRight className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupForm;