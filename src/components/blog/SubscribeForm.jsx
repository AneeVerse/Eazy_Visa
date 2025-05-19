"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiUser, BiEnvelope, BiPhone } from 'react-icons/bi';

const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const response = await fetch('/api/blog-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      // Redirect to thank you page after successful submission
      window.location.href = '/thank-you';
      
    } catch (error) {
      toast.error(error.message || 'Failed to submit. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#003554] text-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto">
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
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full px-4 pl-10 py-3 rounded-lg bg-[#006494]/80 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <BiPhone className="absolute left-3 top-3 mt-1 text-gray-300" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                isLoading 
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