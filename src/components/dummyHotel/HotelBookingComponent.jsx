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

  // City search states
  const [citySearch, setCitySearch] = useState("");
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [activeHotelIndex, setActiveHotelIndex] = useState(0); // Track which hotel input is active
  const cityInputRef = useRef(null);

  // Popular cities data
  const popularCities = [
    { id: 1, name: "New Delhi", country: "India" },
    { id: 2, name: "Mumbai", country: "India" },
    { id: 3, name: "Bangalore", country: "India" },
    { id: 4, name: "Hyderabad", country: "India" },
    { id: 5, name: "Chennai", country: "India" },
    { id: 6, name: "Kolkata", country: "India" },
    { id: 7, name: "Pune", country: "India" },
    { id: 8, name: "Goa", country: "India" },
    { id: 9, name: "Jaipur", country: "India" },
    { id: 10, name: "Udaipur", country: "India" },
    { id: 11, name: "Ahmedabad", country: "India" },
    { id: 12, name: "Lucknow", country: "India" },
    { id: 13, name: "Kochi", country: "India" },
    { id: 14, name: "Dubai", country: "UAE" },
    { id: 15, name: "Abu Dhabi", country: "UAE" },
    { id: 16, name: "Singapore", country: "Singapore" },
    { id: 17, name: "Bangkok", country: "Thailand" },
    { id: 18, name: "Phuket", country: "Thailand" },
    { id: 19, name: "Kuala Lumpur", country: "Malaysia" },
    { id: 20, name: "Penang", country: "Malaysia" },
    { id: 21, name: "London", country: "UK" },
    { id: 22, name: "Manchester", country: "UK" },
    { id: 23, name: "Edinburgh", country: "UK" },
    { id: 24, name: "New York", country: "USA" },
    { id: 25, name: "Los Angeles", country: "USA" },
    { id: 26, name: "Chicago", country: "USA" },
    { id: 27, name: "Las Vegas", country: "USA" },
    { id: 28, name: "San Francisco", country: "USA" },
    { id: 29, name: "Miami", country: "USA" },
    { id: 30, name: "Toronto", country: "Canada" },
    { id: 31, name: "Vancouver", country: "Canada" },
    { id: 32, name: "Montreal", country: "Canada" },
    { id: 33, name: "Sydney", country: "Australia" },
    { id: 34, name: "Melbourne", country: "Australia" },
    { id: 35, name: "Brisbane", country: "Australia" },
    { id: 36, name: "Perth", country: "Australia" },
    { id: 37, name: "Paris", country: "France" },
    { id: 38, name: "Nice", country: "France" },
    { id: 39, name: "Lyon", country: "France" },
    { id: 40, name: "Rome", country: "Italy" },
    { id: 41, name: "Venice", country: "Italy" },
    { id: 42, name: "Milan", country: "Italy" },
    { id: 43, name: "Florence", country: "Italy" },
    { id: 44, name: "Barcelona", country: "Spain" },
    { id: 45, name: "Madrid", country: "Spain" },
    { id: 46, name: "Seville", country: "Spain" },
    { id: 47, name: "Valencia", country: "Spain" },
    { id: 48, name: "Berlin", country: "Germany" },
    { id: 49, name: "Munich", country: "Germany" },
    { id: 50, name: "Frankfurt", country: "Germany" },
    { id: 51, name: "Hamburg", country: "Germany" },
    { id: 52, name: "Amsterdam", country: "Netherlands" },
    { id: 53, name: "Rotterdam", country: "Netherlands" },
    { id: 54, name: "Brussels", country: "Belgium" },
    { id: 55, name: "Antwerp", country: "Belgium" },
    { id: 56, name: "Zurich", country: "Switzerland" },
    { id: 57, name: "Geneva", country: "Switzerland" },
    { id: 58, name: "Vienna", country: "Austria" },
    { id: 59, name: "Salzburg", country: "Austria" },
    { id: 60, name: "Prague", country: "Czech Republic" },
    { id: 61, name: "Budapest", country: "Hungary" },
    { id: 62, name: "Warsaw", country: "Poland" },
    { id: 63, name: "Krakow", country: "Poland" },
    { id: 64, name: "Moscow", country: "Russia" },
    { id: 65, name: "Saint Petersburg", country: "Russia" },
    { id: 66, name: "Istanbul", country: "Turkey" },
    { id: 67, name: "Antalya", country: "Turkey" },
    { id: 68, name: "Cappadocia", country: "Turkey" },
    { id: 69, name: "Cairo", country: "Egypt" },
    { id: 70, name: "Luxor", country: "Egypt" },
    { id: 71, name: "Marrakech", country: "Morocco" },
    { id: 72, name: "Casablanca", country: "Morocco" },
    { id: 73, name: "Cape Town", country: "South Africa" },
    { id: 74, name: "Johannesburg", country: "South Africa" },
    { id: 75, name: "Nairobi", country: "Kenya" },
    { id: 76, name: "Tokyo", country: "Japan" },
    { id: 77, name: "Osaka", country: "Japan" },
    { id: 78, name: "Kyoto", country: "Japan" },
    { id: 79, name: "Seoul", country: "South Korea" },
    { id: 80, name: "Busan", country: "South Korea" },
    { id: 81, name: "Beijing", country: "China" },
    { id: 82, name: "Shanghai", country: "China" },
    { id: 83, name: "Hong Kong", country: "China" },
    { id: 84, name: "Macau", country: "China" },
    { id: 85, name: "Taipei", country: "Taiwan" },
    { id: 86, name: "Manila", country: "Philippines" },
    { id: 87, name: "Cebu", country: "Philippines" },
    { id: 88, name: "Jakarta", country: "Indonesia" },
    { id: 89, name: "Bali", country: "Indonesia" },
    { id: 90, name: "Hanoi", country: "Vietnam" },
    { id: 91, name: "Ho Chi Minh City", country: "Vietnam" },
    { id: 92, name: "Phnom Penh", country: "Cambodia" },
    { id: 93, name: "Siem Reap", country: "Cambodia" },
    { id: 94, name: "Vientiane", country: "Laos" },
    { id: 95, name: "Colombo", country: "Sri Lanka" },
    { id: 96, name: "Kathmandu", country: "Nepal" },
    { id: 97, name: "Pokhara", country: "Nepal" },
    { id: 98, name: "Dhaka", country: "Bangladesh" },
    { id: 99, name: "Mexico City", country: "Mexico" },
    { id: 100, name: "Cancun", country: "Mexico" },
    { id: 101, name: "Rio de Janeiro", country: "Brazil" },
    { id: 102, name: "Sao Paulo", country: "Brazil" },
    { id: 103, name: "Buenos Aires", country: "Argentina" },
    { id: 104, name: "Santiago", country: "Chile" },
    { id: 105, name: "Lima", country: "Peru" },
    { id: 106, name: "Bogota", country: "Colombia" },
    { id: 107, name: "Jerusalem", country: "Israel" },
    { id: 108, name: "Tel Aviv", country: "Israel" },
    { id: 109, name: "Doha", country: "Qatar" },
    { id: 110, name: "Riyadh", country: "Saudi Arabia" },
    { id: 111, name: "Jeddah", country: "Saudi Arabia" },
    { id: 112, name: "Auckland", country: "New Zealand" },
    { id: 113, name: "Wellington", country: "New Zealand" },
    { id: 114, name: "Queenstown", country: "New Zealand" },
    { id: 115, name: "Reykjavik", country: "Iceland" },
    { id: 116, name: "Oslo", country: "Norway" },
    { id: 117, name: "Stockholm", country: "Sweden" },
    { id: 118, name: "Helsinki", country: "Finland" },
    { id: 119, name: "Copenhagen", country: "Denmark" },
    { id: 120, name: "Dublin", country: "Ireland" }
  ];

  // Filter cities based on search
  const filteredCities = citySearch
    ? popularCities.filter(city =>
      city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      city.country.toLowerCase().includes(citySearch.toLowerCase())
    )
    : popularCities;

  // Initial form data
  const initialFormData = {
    contact: {
      email: "",
      phone: "",
      phoneCode: "+91",
    },
    hotels: [{
      location: "",
      checkInDate: null,
      checkOutDate: null,
    }],
    guests: {
      rooms: 1,
      adults: 1,
      children: 0,
    },
    travelers: {
      list: Array(1).fill().map(() => ({ title: "Mr", firstName: "", lastName: "" })),
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

  // Titles configuration for adults and children
  const titlesConfig = {
    adults: ["Mr", "Mrs", "Ms", "Dr"],
    children: ["Master", "Miss"]
  };

  // Price calculation
  // useEffect(() => {
  //   const basePrice = 1000;
  //   const calculatedPrice = (formData.guests.children + formData.guests.adults) * basePrice;
  //   setPrice(calculatedPrice - 1);
  // }, [formData.guests.rooms, formData.guests.children, formData.guests.adults, formData.hotels]);

  // Price calculation
  useEffect(() => {
    const totalPersons = formData.guests.adults + formData.guests.children;
    let calculatedPrice;
    
    if (totalPersons === 1) {
      calculatedPrice = 2000; // INR 2000 for 1 person
    } else {
      calculatedPrice =( totalPersons * 1000) -1; // INR 999 per person for more than 1
    }
    
    setPrice(calculatedPrice);
  }, [formData.guests.adults, formData.guests.children]);

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

  // Handle hotel input changes
  const handleHotelInputChange = (index, field, value) => {
    setFormData(prev => {
      const updatedHotels = [...prev.hotels];
      updatedHotels[index] = {
        ...updatedHotels[index],
        [field]: value
      };
      return {
        ...prev,
        hotels: updatedHotels
      };
    });
  };

  // Add new hotel section
  const addHotel = () => {
    setFormData(prev => ({
      ...prev,
      hotels: [
        ...prev.hotels,
        {
          location: "",
          checkInDate: null,
          checkOutDate: null,
        }
      ]
    }));
  };

  // Remove hotel section
  const removeHotel = (index) => {
    if (formData.hotels.length <= 1) return;
    setFormData(prev => {
      const updatedHotels = [...prev.hotels];
      updatedHotels.splice(index, 1);
      return {
        ...prev,
        hotels: updatedHotels
      };
    });
  };

  // Handle city selection
  const handleCitySelect = (city, index) => {
    handleHotelInputChange(index, 'location', city.name);
    setCitySearch(city.name);
    setShowCitySuggestions(false);
  };

  // Handle city input focus
  const handleCityFocus = (index) => {
    setActiveHotelIndex(index);
    setShowCitySuggestions(true);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target)) {
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle guest changes
  const updateGuests = (type, value) => {
    setFormData(prev => {
      const newValue = Math.max(type === 'rooms' ? 1 : 0, value);

      // Update travelers list when adults count changes
      if (type === 'adults' || type === 'children') {
        const totalGuests = type === 'adults'
          ? newValue + prev.guests.children
          : prev.guests.adults + newValue;

        let updatedTravelers = [...prev.travelers.list];

        if (totalGuests > updatedTravelers.length) {
          // Add new travelers
          const toAdd = totalGuests - updatedTravelers.length;
          for (let i = 0; i < toAdd; i++) {
            const isChild = type === 'children' && i >= (updatedTravelers.length - prev.guests.adults);
            updatedTravelers.push({ 
              title: isChild ? "Master" : "Mr", 
              firstName: "", 
              lastName: "" 
            });
          }
        } else if (totalGuests < updatedTravelers.length) {
          // Remove travelers
          updatedTravelers = updatedTravelers.slice(0, totalGuests);
        }

        return {
          ...prev,
          guests: {
            ...prev.guests,
            [type]: newValue
          },
          travelers: {
            ...prev.travelers,
            list: updatedTravelers
          }
        };
      }

      return {
        ...prev,
        guests: {
          ...prev.guests,
          [type]: newValue
        }
      };
    });
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
      for (const hotel of formData.hotels) {
        if (!hotel.location || !hotel.checkInDate || !hotel.checkOutDate) {
          return false;
        }
      }
      return true;
    } else if (currentStep === 2) {
      for (const traveler of formData.travelers.list) {
        if (!traveler.firstName || !traveler.lastName) {
          return false;
        }
      }
      return true;
    } else if (currentStep === 3) {
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
    console.log("Submitting form data:", formData);

    try {
      const response = await fetch('/api/hotel-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: price,
          hotels: formData.hotels.map(hotel => ({
            ...hotel,
            checkInDate: hotel.checkInDate ? new Date(hotel.checkInDate).toISOString() : null,
            checkOutDate: hotel.checkOutDate ? new Date(hotel.checkOutDate).toISOString() : null
          })),
          additional: {
            ...formData.additional,
            visaInterviewDate: formData.additional.visaInterviewDate ? new Date(formData.additional.visaInterviewDate).toISOString() : null,
            deliveryDate: formData.additional.deliveryDate ? new Date(formData.additional.deliveryDate).toISOString() : null
          }
        }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem('formSubmitted', 'true');
        window.location.href = '/thank-you';
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotels Details</h2>

                    {/* Hotel Sections */}
                    {formData.hotels.map((hotel, hotelIndex) => (
                      <div key={hotelIndex} className="mb-6 border border-gray-200 rounded-lg p-6 relative">
                        {formData.hotels.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHotel(hotelIndex)}
                            className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        )}

                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                          {formData.hotels.length > 1 ? `Hotel ${hotelIndex + 1}` : 'Hotel Details'}
                        </h3>

                        {/* Search Form */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Location with City Suggestions */}
                          <div ref={hotelIndex === activeHotelIndex ? cityInputRef : null}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City, Property Name or Location</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={hotel.location}
                                onChange={(e) => {
                                  handleHotelInputChange(hotelIndex, 'location', e.target.value);
                                  setCitySearch(e.target.value);
                                }}
                                onFocus={() => handleCityFocus(hotelIndex)}
                                className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Where do you want to stay?"
                                required
                              />
                              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                              {/* City Suggestions Dropdown - Only show for active hotel input */}
                              {showCitySuggestions && hotelIndex === activeHotelIndex && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto">
                                  {filteredCities.length > 0 ? (
                                    filteredCities.map((city) => (
                                      <div
                                        key={city.id}
                                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                                        onClick={() => handleCitySelect(city, hotelIndex)}
                                      >
                                        <span className="font-medium">{city.name}</span>
                                        <span className="text-sm text-gray-500">{city.country}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-4 py-3 text-gray-500">No cities found</div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                            {/* Check-in */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Check-In Date</label>
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                  value={hotel.checkInDate}
                                  onChange={(newValue) => handleHotelInputChange(hotelIndex, 'checkInDate', newValue)}
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
                                        value: hotel.checkInDate ? format(new Date(hotel.checkInDate), 'yyyy-MM-dd') : '',
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
                                  value={hotel.checkOutDate}
                                  onChange={(newValue) => handleHotelInputChange(hotelIndex, 'checkOutDate', newValue)}
                                  minDate={hotel.checkInDate || new Date()}
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
                                        value: hotel.checkOutDate ? format(new Date(hotel.checkOutDate), 'yyyy-MM-dd') : '',
                                        placeholder: 'YYYY-MM-DD'
                                      }}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add More Hotel Button */}
                    <div className="flex justify-start mb-8">
                      <button
                        type="button"
                        onClick={addHotel}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600"
                      >
                        <FiPlus className="w-4 h-4" />
                        Add Another Hotel
                      </button>
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
                              onClick={() => updateGuests('rooms', formData.guests.rooms - 1)}
                              disabled={formData.guests.rooms <= 1}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{formData.guests.rooms}</span>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                              onClick={() => updateGuests('rooms', formData.guests.rooms + 1)}
                              disabled={formData.guests.rooms >= 4}
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
                              onClick={() => updateGuests('adults', formData.guests.adults - 1)}
                              disabled={formData.guests.adults <= 1}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{formData.guests.adults}</span>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                              onClick={() => updateGuests('adults', formData.guests.adults + 1)}
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
                              onClick={() => updateGuests('children', formData.guests.children - 1)}
                              disabled={formData.guests.children <= 0}
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{formData.guests.children}</span>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                              onClick={() => updateGuests('children', formData.guests.children + 1)}
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
                            {formData.guests.rooms} {formData.guests.rooms === 1 ? 'Room' : 'Rooms'} ×
                            {formData.hotels.length} {formData.hotels.length === 1 ? 'Hotel' : 'Hotels'}
                          </div>
                        </div>
                        <div className="text-right">
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
                      {formData.travelers.list.map((traveler, index) => {
                        const isChild = index >= formData.guests.adults;
                        const availableTitles = isChild ? titlesConfig.children : titlesConfig.adults;
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                          >
                            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                              <FiUser className="text-blue-500" />
                              {isChild ? `Child ${index - formData.guests.adults + 1}` : `Adult ${index + 1}`}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Title */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <select
                                  value={traveler.title || (isChild ? "Master" : "Mr")}
                                  onChange={(e) => handleTravelerChange(index, 'title', e.target.value)}
                                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  {availableTitles.map((title) => (
                                    <option key={title} value={title}>{title}</option>
                                  ))}
                                </select>
                              </div>

                              {/* First Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                <input
                                  type="text"
                                  value={traveler.firstName || ""}
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
                                  value={traveler.lastName || ""}
                                  onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Surname"
                                  required
                                />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
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