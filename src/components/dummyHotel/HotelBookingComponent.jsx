"use client";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiCalendar, FiChevronDown, FiPlus, FiMinus, FiArrowRight, FiX, FiUser } from "react-icons/fi";
import { FaPlane, FaHotel } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../common/Layout";
import Button from "../common/Button";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { format } from 'date-fns';

export default function HotelBookingComponent() {
  // Form steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  // Initial form data
  const initialFormData = {
    contact: {
      email: "",
      phone: "",
      phoneCode: "+91",
    },
    hotel: {
      location: "",
      checkInDate: null,
      checkOutDate: null,
      rooms: 1,
      adults: 1,
      children: 0,
    },
    travelers: {
      list: [{ title: "Mr", firstName: "", lastName: "" }],
    },
    additional: {
      visaInterviewDate: null,
      deliveryDate: null,
      specialInstructions: ""
    }
  };

  // Form data
  const [formData, setFormData] = useState(initialFormData);

  // UI states
  const [price, setPrice] = useState(0);

  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+971", name: "UAE" },
    { code: "+65", name: "Singapore" },
  ];

  const titles = ["Mr", "Mrs", "Ms", "Miss", "Dr"];

  // Price calculation
  useEffect(() => {
    const basePrice = 1000;
    const calculatedPrice = formData.hotel.adults * basePrice ;
      // (formData.hotel.checkInDate && formData.hotel.checkOutDate ? 
      //  Math.ceil((new Date(formData.hotel.checkOutDate) - new Date(formData.hotel.checkInDate)) / (1000 * 60 * 60 * 24)) : 1);
    setPrice(calculatedPrice-1);
  }, [formData.hotel.rooms, formData.hotel.adults, formData.hotel.checkInDate, formData.hotel.checkOutDate]);

  // Handle input changes
  const handleInputChange = (path, value) => {
    const [parent, child] = path.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  // Handle guest changes
  const updateGuests = (type, value) => {
    setFormData(prev => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        [type]: Math.max(type === 'rooms' ? 1 : 0, value)
      }
    }));
  };

  // Handle traveler changes
  const handleTravelerChange = (index, field, value) => {
    setFormData(prev => {
      const updatedTravelers = [...prev.travelers.list];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [field]: value
      };
      return {
        ...prev,
        travelers: {
          ...prev.travelers,
          list: updatedTravelers
        }
      };
    });
  };

  // Validate current step
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      // Validate hotel details
      if (!formData.hotel.location || !formData.hotel.checkInDate || !formData.hotel.checkOutDate) {
        return false;
      }
      return true;
    } else if (currentStep === 2) {
      // Validate traveler info
      for (const traveler of formData.travelers.list) {
        if (!traveler.firstName || !traveler.lastName) {
          return false;
        }
      }
      return true;
    } else if (currentStep === 3) {
      // Validate contact info
      if (!formData.contact.email || !formData.contact.phone) {
        return false;
      }
      return true;
    }
    return true;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 3) {
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/hotel-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          hotel: {
            ...formData.hotel,
            checkInDate: formData.hotel.checkInDate ? new Date(formData.hotel.checkInDate).toISOString() : null,
            checkOutDate: formData.hotel.checkOutDate ? new Date(formData.hotel.checkOutDate).toISOString() : null
          },
          additional: {
            ...formData.additional,
            visaInterviewDate: formData.additional.visaInterviewDate ? new Date(formData.additional.visaInterviewDate).toISOString() : null,
            deliveryDate: formData.additional.deliveryDate ? new Date(formData.additional.deliveryDate).toISOString() : null
          }
        }),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        // toast.success('Hotel booking submitted successfully!');
         // Set flag in sessionStorage before redirecting
         sessionStorage.setItem('formSubmitted', 'true');
         
         // Redirect to thank you page
         window.location.href = '/thank-you';
        // setFormData(initialFormData);
        // setCurrentStep(1);
      } else {
        toast.error(result.error || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting your booking');
    } finally {
      setIsLoading(false);
    }
  };

  // Step navigation
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <Layout>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        className="mt-[70px]"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="mt-8 relative overflow-hidden" ref={formRef}>
        {/* Header with Flight and Hotel Navigation */}
        <div className="flex bg-white shadow-md relative z-30 -mb-13 border mx-5 sm:mx-10 md:mx-16 rounded-2xl border-gray-200">
          <Link
            href="/services/dummy-flights"
            className={`flex-1 py-3 px-6 cursor-pointer rounded-l-2xl flex flex-col items-center justify-center font-bold text-lg transition-colors text-white bg-white`}
          >
            <img
              src="/images/icon/png/aeroplan-black.png"
              alt="Flight Icon"
              className="w-16 h-14 object-cover"
            />
            <span className="text-gray-600">Flights</span> 
          </Link>
          <Link 
            href={"/services/dummy-hotel"}
            className={`flex-1 py-3 px-6 flex flex-col border-l border-gray-200 items-center justify-center font-bold text-lg transition-colors rounded-tr-2xl text-gray-600 hover:text-blue-600`}
          >
            <img
              src="/images/icon/png/hotel-blue.png"
              alt="Flight Icon"
              className="w-16 h-14 object-cover"
            />
            <span className="text-primary-500">Hotels</span> 
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="px-8 rounded-t-2xl border-t border-r border-l border-gray-200 pt-20 bg-white">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border-2 border-gray-300'}`}
                >
                  {step}
                </div>
                <span className={`text-sm mt-2 font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step === 1 ? 'Hotel Details' : step === 2 ? 'Guest Info' : 'Review'}
                </span>
              </div>
            ))}
            <div className="absolute top-6 left-12 right-12 h-1 bg-gray-200 z-0">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white rounded-b-2xl border-r border-l border-b border-gray-200">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Hotel Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Stay</h2>
                    
                    {/* Search Form */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City, Property Name or Location</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.hotel.location}
                            onChange={(e) => handleInputChange('hotel.location', e.target.value)}
                            className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Where do you want to stay?"
                            required
                          />
                          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Dates */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        {/* Check-in */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-In Date</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={formData.hotel.checkInDate}
                              onChange={(newValue) => handleInputChange('hotel.checkInDate', newValue)}
                              minDate={new Date()}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      height: '56px',
                                      borderRadius: '0.5rem',
                                      '& fieldset': {
                                        borderColor: 'rgb(209, 213, 219)',
                                        borderRadius: '0.5rem',
                                      },
                                      '&:hover fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                        borderWidth: '2px',
                                      },
                                    },
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    value: formData.hotel.checkInDate ? format(new Date(formData.hotel.checkInDate), 'yyyy-MM-dd') : '',
                                    placeholder: 'YYYY-MM-DD'
                                  }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        
                        {/* Check-out */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Check-Out Date</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={formData.hotel.checkOutDate}
                              onChange={(newValue) => handleInputChange('hotel.checkOutDate', newValue)}
                              minDate={formData.hotel.checkInDate || new Date()}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      height: '56px',
                                      borderRadius: '0.5rem',
                                      '& fieldset': {
                                        borderColor: 'rgb(209, 213, 219)',
                                        borderRadius: '0.5rem',
                                      },
                                      '&:hover fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                        borderWidth: '2px',
                                      },
                                    },
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    value: formData.hotel.checkOutDate ? format(new Date(formData.hotel.checkOutDate), 'yyyy-MM-dd') : '',
                                    placeholder: 'YYYY-MM-DD'
                                  }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>

                    {/* Rooms & Guests */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Rooms & Guests</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Rooms */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
                          <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                              onClick={() => updateGuests('rooms', formData.hotel.rooms - 1)}
                              disabled={formData.hotel.rooms <= 1}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{formData.hotel.rooms}</span>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                              onClick={() => updateGuests('rooms', formData.hotel.rooms + 1)}
                              disabled={formData.hotel.rooms >= 4}
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Adults */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                          <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                              onClick={() => updateGuests('adults', formData.hotel.adults - 1)}
                              disabled={formData.hotel.adults <= 1}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{formData.hotel.adults}</span>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                              onClick={() => updateGuests('adults', formData.hotel.adults + 1)}
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Children */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Children (0-12)</label>
                          <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                              onClick={() => updateGuests('children', formData.hotel.children - 1)}
                              disabled={formData.hotel.children <= 0}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{formData.hotel.children}</span>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                              onClick={() => updateGuests('children', formData.hotel.children + 1)}
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Estimated Total</div>
                          <div className="text-2xl font-bold text-blue-600">₹{price.toLocaleString()}.00</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formData.hotel.rooms} {formData.hotel.rooms === 1 ? 'Room' : 'Rooms'} × 
                            {formData.hotel.checkInDate && formData.hotel.checkOutDate ? 
                              ` ${Math.ceil((new Date(formData.hotel.checkOutDate) - new Date(formData.hotel.checkInDate)) / (1000 * 60 * 60 * 24))} Nights ` : ' 1 Night'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-700">₹1500 per night</div>
                          <div className="text-xs text-gray-500">Excluding taxes & fees</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center sm:justify-end pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full md:w-auto px-8 py-3"
                      >
                        Continue to Guest Details
                        <FiArrowRight className="ml-3 text-xl" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Guest Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Guest Information</h2>
                    <p className="text-gray-600 mb-6">Please enter details for all guests</p>
                    
                    <div className="space-y-6">
                      {Array.from({ length: formData.hotel.adults + formData.hotel.children }).map((_, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                        >
                          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <FiUser className="text-blue-500" />
                            {index < formData.hotel.adults ? `Adult ${index + 1}` : `Child ${index - formData.hotel.adults + 1}`}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Title */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <select
                                value={formData.travelers.list[index]?.title || "Mr"}
                                onChange={(e) => handleTravelerChange(index, 'title', e.target.value)}
                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {titles.map((title) => (
                                  <option key={title} value={title}>{title}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* First Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                              <input
                                type="text"
                                value={formData.travelers.list[index]?.firstName || ""}
                                onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Given name"
                                required
                              />
                            </div>
                            
                            {/* Last Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                              <input
                                type="text"
                                value={formData.travelers.list[index]?.lastName || ""}
                                onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Surname"
                                required
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                        className="w-full md:w-auto px-8 py-3"
                      >
                        Back
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full md:w-auto px-8 py-3"
                      >
                        Contact Info
                        <FiArrowRight className="ml-3 text-xl" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                          <span className="text-xs text-gray-500 block mt-1">Booking confirmation will be sent here</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.contact.email}
                          onChange={(e) => handleInputChange('contact.email', e.target.value)}
                          className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                          <span className="text-xs text-gray-500 block mt-1">For booking confirmation</span>
                        </label>
                        <div className="flex">
                          <select
                            name="phoneCode"
                            value={formData.contact.phoneCode}
                            onChange={(e) => handleInputChange('contact.phoneCode', e.target.value)}
                            className="w-24 p-3.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                          >
                            {countryCodes.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.code}
                              </option>
                            ))}
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.contact.phone}
                            onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                            className="flex-1 p-3.5 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="9876543210"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Visa Interview Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Interview Date</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={formData.additional.visaInterviewDate}
                              onChange={(newValue) => handleInputChange('additional.visaInterviewDate', newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      height: '56px',
                                      borderRadius: '0.5rem',
                                      '& fieldset': {
                                        borderColor: 'rgb(209, 213, 219)',
                                        borderRadius: '0.5rem',
                                      },
                                      '&:hover fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                        borderWidth: '2px',
                                      },
                                    },
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    value: formData.additional.visaInterviewDate ? format(new Date(formData.additional.visaInterviewDate), 'yyyy-MM-dd') : '',
                                    placeholder: 'YYYY-MM-DD'
                                  }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        
                        {/* Delivery Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Date</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={formData.additional.deliveryDate}
                              onChange={(newValue) => handleInputChange('additional.deliveryDate', newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      height: '56px',
                                      borderRadius: '0.5rem',
                                      '& fieldset': {
                                        borderColor: 'rgb(209, 213, 219)',
                                        borderRadius: '0.5rem',
                                      },
                                      '&:hover fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'rgb(59, 130, 246)',
                                        borderWidth: '2px',
                                      },
                                    },
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    value: formData.additional.deliveryDate ? format(new Date(formData.additional.deliveryDate), 'yyyy-MM-dd') : '',
                                    placeholder: 'YYYY-MM-DD'
                                  }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      
                      {/* Special Instructions */}
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requests
                          <span className="text-xs text-gray-500 block mt-1">Any special requests or questions?</span>
                        </label>
                        <textarea
                          name="specialInstructions"
                          value={formData.additional.specialInstructions}
                          onChange={(e) => handleInputChange('additional.specialInstructions', e.target.value)}
                          className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                          placeholder="e.g., Early check-in, extra beds, dietary requirements, etc."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                        className="w-full md:w-auto px-8 py-3"
                      >
                        Back
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto px-3 sm:px-8 py-3"
                        disabled={isLoading}
                      >
                        {!isLoading ? "Complete Booking" : "Submitting..."}
                        {!isLoading && <FiArrowRight className="ml-3 text-xl" />}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </Layout>
  );
}