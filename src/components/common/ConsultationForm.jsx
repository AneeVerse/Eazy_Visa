"use client";

import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ 
    show: false, 
    message: "", 
    success: false 
  });
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    phone: "" 
  });

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPopup({ 
        show: true, 
        message: "Form submitted successfully!", 
        success: true 
      });
      setFormData({ name: "", email: "", phone: "" });
      setIsAccepted(false);
    } catch (error) {
      setPopup({ 
        show: true, 
        message: "Submission failed. Please try again.", 
        success: false 
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setPopup({ show: false }), 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Form Header */}
      <div className="bg-blue-600 p-4 text-white">
        <h3 className="text-xl font-semibold">Need Visa Help?</h3>
        <p className="text-sm opacity-90">Get free consultation from our experts</p>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone*
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="+91 9876543210"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={isAccepted}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !isAccepted}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-4 py-3 px-4 rounded-lg font-medium ${
              isLoading || !isAccepted
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            } transition-colors`}
          >
            {isLoading ? "Processing..." : "Get Free Consultation"}
          </motion.button>
        </form>

        {/* Support Info */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            <BiSupport className="mr-2 text-blue-500" />
            Call us:{" "}
            <a
              href="tel:+918850146905"
              className="text-blue-600 hover:underline ml-1"
            >
              +91 88501 46905
            </a>
          </p>
        </div>
      </div>

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

export default ConsultationForm;