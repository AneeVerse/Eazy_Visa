import React, { useState } from 'react';
import { BiSupport } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    visaType: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Country options - you can fetch these from your API
  const countryOptions = [
    'Germany', 'France', 'Italy', 'Spain', 'United Kingdom',
    'United States', 'Canada', 'Australia', 'Japan', 'Singapore'
  ];

  // Visa type options
  const visaTypeOptions = [
    'Tourist Visa', 'Business Visa', 'Student Visa',
    'Work Visa', 'Transit Visa'
  ];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.visaType) {
      newErrors.visaType = 'Please select a visa type';
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

    // Clear error when user starts typing
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
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // API integration - replace with your actual endpoint
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Show success popup
      toast.success('Form submitted successfully! Our team will contact you shortly.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        visaType: ''
      });
      setIsAccepted(false);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/80 p-6 rounded-lg shadow-md">
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
            className={`w-full px-4 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"
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
            className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"
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
            className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
            placeholder="+91 9876543210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.country ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Country</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div> */}

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type*</label>
          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.visaType ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Visa Type</option>
            {visaTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.visaType && <p className="text-red-500 text-sm mt-1">{errors.visaType}</p>}
        </div> */}

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
          className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${isLoading || !isAccepted ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : "Get Free Consultation"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 flex items-center justify-center">
          <BiSupport className="mr-2" />
          Call us: <a href="tel:+918850146905" className="text-blue-500 hover:underline ml-1">+91 88501 46905</a>
        </p>
      </div>
    </div>
  );
};

export default FormComponent;