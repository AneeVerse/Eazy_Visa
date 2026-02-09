"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoIosClose, IoMdChatboxes } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import CountryCodeDropdown from '../common/CountryCodeDropdown';

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedContactType, setSelectedContactType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91', // Default to India
    contactType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleContactClick = (type) => {
    setSelectedContactType(type);
    setFormData({ ...formData, contactType: type });
    setShowForm(true);
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCountryCodeChange = (code) => {
    setFormData({
      ...formData,
      countryCode: code
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine country code with phone number (with space)
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

      // For Google Sheets compatibility, also create a version without special characters
      const googleSheetsPhone = `${formData.countryCode.replace('+', '')}${formData.phone}`;

      const response = await fetch('/api/contact-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber, // Send the complete phone number with country code for email
          googleSheetsPhone: googleSheetsPhone, // Send clean version for Google Sheets
          source: 'contact widget'
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', contactType: '' });
        let timeLeft = 3;
        setCountdown(timeLeft);
        const countdownInterval = setInterval(() => {
          timeLeft--;
          setCountdown(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
          }
        }, 1000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, rotate: 360 },
    tap: { scale: 0.95 }
  };

  // Add this useEffect after all useState declarations
  useEffect(() => {
    if (showSuccess && countdown === 0) {
      setShowSuccess(false);
      setShowForm(false);
      setCountdown(3);
      if (selectedContactType === 'WhatsApp') {
        window.location.href = 'https://wa.me/+918850146905';
      } else if (selectedContactType === 'Email') {
        window.location.href = 'mailto:info@eazyvisas.com';
      } else if (selectedContactType === 'Phone') {
        window.location.href = 'tel:+918850146905';
      }
    }
  }, [showSuccess, countdown, selectedContactType]);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40">
      {!open && !showForm && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center gap-3 mb-4"
        >
          <motion.button
            onClick={() => handleContactClick('WhatsApp')}
            className="w-14 h-14 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp size={26} />
          </motion.button>

          <motion.button
            onClick={() => handleContactClick('Email')}
            className="w-14 h-14 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope size={26} />
          </motion.button>

          <motion.button
            onClick={() => handleContactClick('Phone')}
            className="w-14 h-14 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPhone size={26} />
          </motion.button>
        </motion.div>
      )}

      {/* Contact Form Modal */}
      {showForm && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            className="bg-white relative rounded-xl shadow-lg p-8 max-w-md w-full mx-4"
            variants={containerVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {showSuccess ? 'Thank You!' : `Contact Us via ${selectedContactType}`}
              </h2>
              {!showSuccess && (
                <motion.button
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.2 }}
                >
                  <IoIosClose className="h-8 w-8" />
                </motion.button>
              )}
            </div>

            {showSuccess ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Form Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Redirecting to {selectedContactType} in {countdown} seconds...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <CountryCodeDropdown
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      height="h-10"
                      borderColor="border-gray-300"
                    />
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-l-0 rounded-r-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}

      <motion.button
        className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <div>
          {open ? (
            <IoMdChatboxes className="self-center h-8 w-8" />
          ) : (
            <IoClose className='self-center h-7 w-7' />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
