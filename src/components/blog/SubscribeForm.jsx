"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiUser, BiEnvelope, BiPhone, BiTask } from 'react-icons/bi';
import CountryCodeDropdown from '../common/CountryCodeDropdown';
import useGeoLocation from '../../hooks/useGeoLocation';

const SubscribeForm = () => {
  const userGeo = useGeoLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91', // Default to India
    service: '' // Add service field
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (code) => {
    setFormData({
      ...formData,
      countryCode: code
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.service) {
      errors.service = 'Please select a service';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    setIsLoading(true);

    try {
      // Combine country code with phone number (with space)
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

      // For Google Sheets compatibility, also create a version without special characters
      const googleSheetsPhone = `${formData.countryCode.replace('+', '')}${formData.phone}`;

      const response = await fetch('/api/blog-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber, // Send the complete phone number with country code for email
          googleSheetsPhone: googleSheetsPhone, // Send clean version for Google Sheets
          service: formData.service, // Include selected service
          userLocation: userGeo ? `${userGeo.city}, ${userGeo.region}, ${userGeo.country}` : 'Unknown',
          userPincode: userGeo ? userGeo.pincode : 'Unknown',
          userIp: userGeo ? userGeo.ip : 'Unknown'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      // Always redirect to blog confirmation page regardless of selected service
      window.location.href = '/confirmation-blogs';

    } catch (error) {
      toast.error(error.message || 'Failed to submit. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#003554] text-white rounded-2xl shadow-lg overflow-visible max-w-md mx-auto">
        <div className="relative h-[170px]">
          <Image
            src="https://images.unsplash.com/photo-1601342550031-d6df73676153?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact us"
            fill
            className="object-cover"
          />
          {/* <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-center px-4">Get in Touch With Us</h3>
          </div> */}
        </div>

        <div className="p-4">
          <p className="text-gray-300 text-sm mb-3 text-left">
            Fill out the form below and our team will contact you shortly
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* First Name Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 pl-10 py-3 rounded-lg bg-[#006494]/80 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <BiUser className="absolute left-3 top-3 mt-1 text-gray-300" />
              </div>
            </div>

            {/* Last Name Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 pl-10 py-3 rounded-lg bg-[#006494]/80 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <BiUser className="absolute left-3 top-3 mt-1 text-gray-300" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 pl-10 py-3 rounded-lg bg-[#006494]/80 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <BiEnvelope className="absolute left-3 top-3 mt-1 text-gray-300" />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <div className="flex relative z-50">
                <div className="relative z-[60]">
                  <CountryCodeDropdown
                    value={formData.countryCode}
                    onChange={handleCountryCodeChange}
                    height="h-12"
                    bgColor="bg-[#006494]/80"
                    borderColor="border-blue-700"
                    className="flex-shrink-0 w-20 text-sm"
                    direction="up"
                    dropdownClassName="absolute top-full left-0 mt-1 bg-[#003554] border border-blue-700 rounded-md shadow-lg max-h-40 overflow-y-auto z-[70] min-w-[120px]"
                    textSize="text-sm"
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 pl-10 py-3 border border-l-0 rounded-r-lg bg-[#006494]/80 text-white border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <BiPhone className="absolute left-3 top-3 mt-1 text-gray-300" />
                </div>
              </div>
            </div>

            {/* Service Field */}
            <div>
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 pl-10 py-3 rounded-lg bg-[#006494]/80 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="" className="bg-[#003554] text-white">Select Service</option>
                  <option value="Tourist Visa" className="bg-[#003554] text-white">Tourist Visa</option>
                  <option value="Business Visa" className="bg-[#003554] text-white">Business Visa</option>
                  <option value="End to End" className="bg-[#003554] text-white">End to End</option>
                  <option value="Dummy Hotel" className="bg-[#003554] text-white">Dummy Hotel</option>
                  <option value="Dummy Flight" className="bg-[#003554] text-white">Dummy Flight</option>
                </select>
                <BiTask className="absolute left-3 top-3 mt-1 text-gray-300" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isLoading ? 'Submitting...' : 'Get Started'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
      />
    </>
  );
};

export default SubscribeForm;