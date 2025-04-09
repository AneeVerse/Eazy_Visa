"use client";
import { useState, useEffect } from "react";
import { FiChevronDown, FiPlus, FiArrowRight, FiX, FiUser, FiCalendar } from "react-icons/fi";
import { FaPlane, FaHotel } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../common/Layout";
import Button from "../common/Button";

const FlightBookingComponent = () => {
  // Form steps
  const [currentStep, setCurrentStep] = useState(1);
  
  const [isLoading, setIsLoading] = useState(false)
  // Initial form data
  const initialFormData = {
    contact: {
      email: "",
      phone: "",
      phoneCode: "+91",
    },
    flight: {
      type: "one-way",
      legs: [{ from: "", to: "", date: "" }],
    },
    travelers: {
      count: 1,
      list: [{ type: "adult", title: "Mr", firstName: "", lastName: "", age: "" }],
    },
    additional: {
      visaInterviewDate: "",
      deliveryDate: "",
      specialInstructions: ""
    }
  };

  // Form data
  const [formData, setFormData] = useState(initialFormData);

  // UI states
  const [price, setPrice] = useState(0);
  const [airports] = useState([
    { code: "DEL", name: "Delhi" },
    { code: "BOM", name: "Mumbai" },
    { code: "BLR", name: "Bengaluru" },
    { code: "MAA", name: "Chennai" },
    { code: "HYD", name: "Hyderabad" },
    { code: "CCU", name: "Kolkata" },
    { code: "GOI", name: "Goa" },
    { code: "PNQ", name: "Pune" }
  ]);

  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+971", name: "UAE" },
    { code: "+65", name: "Singapore" },
  ];

  const travelerTypes = [
    { value: "adult", label: "Adult (12+ years)", titles: ["Mr", "Mrs", "Ms", "Dr"] },
    { value: "child", label: "Child (2-12 years)", titles: ["Master", "Miss"] },
    { value: "infant", label: "Infant (0-2 years)", titles: ["Baby"] }
  ];

  // Price calculation
  useEffect(() => {
    const basePrice = 1000;
    const discount = 1; // ₹1 discount per person
    const calculatedPrice = formData.travelers.count > 0 ? 
      (formData.travelers.count * basePrice) - discount : 0;
    setPrice(calculatedPrice);
  }, [formData.travelers.count]);

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

  // Handle flight leg changes
  const handleFlightLegChange = (index, field, value) => {
    setFormData(prev => {
      const updatedLegs = [...prev.flight.legs];
      updatedLegs[index] = {
        ...updatedLegs[index],
        [field]: value
      };
      return {
        ...prev,
        flight: {
          ...prev.flight,
          legs: updatedLegs
        }
      };
    });
  };

  // Traveler functions
  const updateTravelerCount = (count) => {
    const newCount = Math.max(1, Math.min(10, count));
    setFormData(prev => {
      const currentList = [...prev.travelers.list];
      
      if (newCount > currentList.length) {
        const newTravelers = Array(newCount - currentList.length)
          .fill()
          .map(() => ({ 
            type: "adult", 
            title: "Mr", 
            firstName: "", 
            lastName: "",
            age: ""
          }));
        return {
          ...prev,
          travelers: {
            count: newCount,
            list: [...currentList, ...newTravelers]
          }
        };
      } else if (newCount < currentList.length) {
        return {
          ...prev,
          travelers: {
            count: newCount,
            list: currentList.slice(0, newCount)
          }
        };
      }
      
      return {
        ...prev,
        travelers: {
          ...prev.travelers,
          count: newCount
        }
      };
    });
  };

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

  // Flight leg functions
  const addFlightLeg = () => {
    setFormData(prev => ({
      ...prev,
      flight: {
        ...prev.flight,
        legs: [...prev.flight.legs, { from: "", to: "", date: "" }]
      }
    }));
  };

  const removeFlightLeg = (index) => {
    if (formData.flight.legs.length > 1) {
      setFormData(prev => {
        const updatedLegs = [...prev.flight.legs];
        updatedLegs.splice(index, 1);
        return {
          ...prev,
          flight: {
            ...prev.flight,
            legs: updatedLegs
          }
        };
      });
    }
  };

  // Validate current step
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      // Validate flight details
      for (const leg of formData.flight.legs) {
        if (!leg.from || !leg.to || !leg.date) {
          return false;
        }
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
      setIsLoading(true) // Set loading to true when submission starts
      
    
    try {
      const response = await fetch('/api/flight-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        // Show success toast
        toast.success('Flight booking submitted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Reset form
        setFormData(initialFormData);
        setCurrentStep(1);
      } else {
        toast.error(result.error || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting your booking');
    }finally{
        setIsLoading(false)
    }
  };

  // Step navigation
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
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
      
      <div className="bg-white mt-8 rounded-2xl shadow-lg border border-gray-100 max-w-6xl mx-auto overflow-hidden">
        {/* Header with Flight and Hotel Navigation */}
        <div className="flex border-b rounded-t-2xl border-gray-200 ">
          <Link
            href="/services/dummy-flights"
            className={`flex-1 py-3 px-6 cursor-pointer flex flex-col items-center justify-center font-bold text-lg transition-colors text-white bg-white`}
          >
            <img
              src="/images/icon/png/aeroplan-blue.png"
                alt="Flight Icon"
                className="w-20 h-18 object-cover"
            />
            <span className="text-primary-500">Flights</span> 
          </Link>
          <Link 
            href={"/services/dummy-hotel"}
            className={`flex-1 py-5 px-6 flex flex-col border-l border-gray-200 items-center justify-center  font-bold text-lg transition-colors rounded-tr-2xl text-gray-600 hover:text-blue-600 `}
          >
            
            <img
              src="/images/icon/png/hotel-black.png"
                alt="Flight Icon"
                className="w-20 h-18 object-cover"
            />
            <span className="text-gray-600">Hotels</span> 
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="px-8 pt-6 ">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border-2 border-gray-300'}`}
                >
                  {step}
                </div>
                <span className={`text-sm mt-2 font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step === 1 ? 'Flight Details' : step === 2 ? 'Traveler Info' : 'Review'}
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

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Flight Details */}
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Flight Details</h2>
                    
                    {/* Flight Type Tabs */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                      {["one-way", "round-trip", "multi-city"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`flex-1 py-3 px-4 text-center font-medium capitalize rounded-md transition-all ${formData.flight.type === type ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-blue-600'}`}
                          onClick={() => handleInputChange('flight.type', type)}
                        >
                          {type.split('-').join(' ')}
                        </button>
                      ))}
                    </div>

                    {/* Flight Legs */}
                    <div className="space-y-6">
                      {formData.flight.legs.map((leg, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-6 bg-white rounded-xl border border-gray-200 relative shadow-sm"
                        >
                          {formData.flight.legs.length > 1 && (
                            <button
                              type="button"
                              className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-full bg-red-50"
                              onClick={() => removeFlightLeg(index)}
                            >
                              <FiX className="w-5 h-5" />
                            </button>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* From */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Flying from</label>
                              <div className="relative">
                                <select
                                  value={leg.from}
                                  onChange={(e) => handleFlightLegChange(index, 'from', e.target.value)}
                                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                  required
                                >
                                  <option value="">Select departure</option>
                                  {airports.map((airport) => (
                                    <option key={airport.code} value={airport.code}>
                                      {airport.name} ({airport.code})
                                    </option>
                                  ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                            </div>
                            
                            {/* To */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Flying to</label>
                              <div className="relative">
                                <select
                                  value={leg.to}
                                  onChange={(e) => handleFlightLegChange(index, 'to', e.target.value)}
                                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                  required
                                >
                                  <option value="">Select destination</option>
                                  {airports.map((airport) => (
                                    <option key={airport.code} value={airport.code}>
                                      {airport.name} ({airport.code})
                                    </option>
                                  ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                            </div>
                            
                            {/* Date */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {index === 0 ? 'Departure Date' : 'Next Flight Date'}
                              </label>
                              <div className="relative">
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                  <input
                                    type="date"
                                    value={leg.date}
                                    onChange={(e) => handleFlightLegChange(index, 'date', e.target.value)}
                                    className="w-full p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                  />
                                  {/* <FiCalendar className="mx-3 text-gray-400" /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {(formData.flight.type === "multi-city" || 
                       (formData.flight.type === "round-trip" && formData.flight.legs.length < 2)) && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                          onClick={addFlightLeg}
                        >
                          <FiPlus className="mr-2" />
                          <span>Add another flight</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Number of Travelers */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Number of Travelers</h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-1 max-w-xs w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Travelers
                        </label>
                        <div className="relative">
                          <select
                            value={formData.travelers.count}
                            onChange={(e) => updateTravelerCount(parseInt(e.target.value))}
                            className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'Traveler' : 'Travelers'}
                              </option>
                            ))}
                          </select>
                          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg flex-1 max-w-xs w-full border border-blue-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-700">Total Price:</div>
                            <div className="text-2xl font-bold text-blue-600">₹{price.toLocaleString()}.00</div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            ₹1000 per traveler<br/>
                            ₹1 discount applied
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="w-full md:w-auto px-8 py-3"
                      >
                        Continue to Traveler Details
                        <FiArrowRight className="ml-3 text-xl" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

                 {/* Step 2: Traveler Information */}
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Traveler Information</h2>
                    <p className="text-gray-600 mb-6">Please enter details for all travelers</p>
                    
                    <div className="space-y-6">
                      {formData.travelers.list.map((traveler, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                              <FiUser className="text-blue-500" />
                              Traveler {index + 1}
                            </h3>
                            {index > 0 && (
                              <button
                                type="button"
                                className="text-sm text-red-500 hover:text-red-700"
                                onClick={() => updateTravelerCount(formData.travelers.count - 1)}
                              >
                                Remove traveler
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Traveler Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Traveler Type</label>
                              <select
                                value={traveler.type}
                                onChange={(e) => handleTravelerChange(index, 'type', e.target.value)}
                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {travelerTypes.map((type) => (
                                  <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Title */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                              <select
                                value={traveler.title}
                                onChange={(e) => handleTravelerChange(index, 'title', e.target.value)}
                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {travelerTypes.find(t => t.value === traveler.type)?.titles.map(title => (
                                  <option key={title} value={title}>{title}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* First Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                              <input
                                type="text"
                                value={traveler.firstName}
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
                                value={traveler.lastName}
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
                        Continue to Contact Info
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
                          <span className="text-xs text-gray-500 block mt-1">Order confirmation will be sent here</span>
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
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <input
                              type="date"
                              name="visaInterviewDate"
                              value={formData.additional.visaInterviewDate}
                              onChange={(e) => handleInputChange('additional.visaInterviewDate', e.target.value)}
                              className="w-full p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {/* <FiCalendar className="mx-3 text-gray-400" /> */}
                          </div>
                        </div>
                        
                        {/* Delivery Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Date</label>
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <input
                              type="date"
                              name="deliveryDate"
                              value={formData.additional.deliveryDate}
                              onChange={(e) => handleInputChange('additional.deliveryDate', e.target.value)}
                              className="w-full p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {/* <FiCalendar className="mx-3 text-gray-400" /> */}
                          </div>
                        </div>
                      </div>
                      
                      {/* Special Instructions */}
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Instructions
                          <span className="text-xs text-gray-500 block mt-1">Any special requests or questions?</span>
                        </label>
                        <textarea
                          name="specialInstructions"
                          value={formData.additional.specialInstructions}
                          onChange={(e) => handleInputChange('additional.specialInstructions', e.target.value)}
                          className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                          placeholder="e.g., Wheelchair assistance, dietary requirements, etc."
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
                        className="w-full md:w-auto px-8 py-3"
                        disabled={isLoading ? true : false }
                        >
                         {!isLoading ?  "Complete Booking": "Submiting..."}
  
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
};

export default FlightBookingComponent;