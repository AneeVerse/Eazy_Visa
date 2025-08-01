"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaCheck, FaArrowRight, FaCalendarAlt, FaShieldAlt, FaFilePdf, FaEdit, FaBan } from 'react-icons/fa';
import { MdFlight, MdHotel } from 'react-icons/md';
import Image from 'next/image';
import Button from '../common/Button';
import AirportDropdown from './AirportDropdown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HeroBookingSection = ({ onBookingClick }) => {
  // Custom styles for react-datepicker
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-datepicker {
        border: 1px solid #e5e7eb !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        font-family: inherit !important;
      }
      
      .custom-datepicker .react-datepicker__header {
        background-color: #3b82f6 !important;
        border-bottom: none !important;
        border-radius: 0.5rem 0.5rem 0 0 !important;
        padding: 1rem !important;
      }
      
      .custom-datepicker .react-datepicker__current-month {
        color: white !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
        margin-bottom: 0.5rem !important;
      }
      
      .custom-datepicker .react-datepicker__day-name {
        color: white !important;
        font-weight: 500 !important;
        font-size: 0.75rem !important;
        width: 2rem !important;
        line-height: 2rem !important;
      }
      
      .custom-datepicker .react-datepicker__day {
        width: 2rem !important;
        line-height: 2rem !important;
        font-size: 0.875rem !important;
        border-radius: 0.25rem !important;
        color: #374151 !important;
        transition: all 0.2s ease !important;
      }
      
      .custom-datepicker .react-datepicker__day:hover {
        background-color: #dbeafe !important;
        color: #1d4ed8 !important;
      }
      
      .custom-datepicker .react-datepicker__day--selected {
        background-color: #3b82f6 !important;
        color: white !important;
        font-weight: 600 !important;
      }
      
      .custom-datepicker .react-datepicker__day--today {
        background-color: #fef3c7 !important;
        color: #d97706 !important;
        font-weight: 600 !important;
      }
      
      .custom-datepicker .react-datepicker__navigation {
        border: none !important;
        width: 2rem !important;
        height: 2rem !important;
        top: 1rem !important;
      }
      
      .custom-datepicker .react-datepicker__navigation--previous {
        left: 1rem !important;
      }
      
      .custom-datepicker .react-datepicker__navigation--next {
        right: 1rem !important;
      }
      
      .custom-datepicker .react-datepicker__navigation-icon::before {
        border-color: white !important;
        border-width: 2px 2px 0 0 !important;
        width: 6px !important;
        height: 6px !important;
      }
      
      .custom-datepicker .react-datepicker__month-container {
        background-color: white !important;
      }
      
      .custom-datepicker .react-datepicker__month {
        padding: 1rem !important;
      }
      
      .custom-datepicker .react-datepicker__day--disabled {
        color: #d1d5db !important;
        cursor: not-allowed !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('one-way');
  
  // Hotel city search states
  const [citySearch, setCitySearch] = useState("");
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const cityInputRef = useRef(null);

  // Popular cities data for hotel search
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
    { id: 10, name: "Dubai", country: "UAE" },
    { id: 11, name: "Singapore", country: "Singapore" },
    { id: 12, name: "Bangkok", country: "Thailand" },
    { id: 13, name: "London", country: "UK" },
    { id: 14, name: "New York", country: "USA" },
    { id: 15, name: "Paris", country: "France" },
    { id: 16, name: "Rome", country: "Italy" },
    { id: 17, name: "Barcelona", country: "Spain" },
    { id: 18, name: "Amsterdam", country: "Netherlands" },
    { id: 19, name: "Tokyo", country: "Japan" },
    { id: 20, name: "Sydney", country: "Australia" }
  ];

  // Filter cities based on search
  const filteredCities = citySearch
    ? popularCities.filter(city =>
      city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      city.country.toLowerCase().includes(citySearch.toLowerCase())
    )
    : popularCities.slice(0, 8); // Show first 8 cities by default

  // Form data structure similar to original
  const [formData, setFormData] = useState({
    contact: {
      email: "",
      phone: "",
      phoneCode: "+91",
    },
    flight: {
      type: "one-way",
      legs: [{ from: "", to: "", date: null }],
    },
    travelers: {
      count: 1,
      list: [{ type: "adult", title: "Mr", firstName: "", lastName: "", age: "" }],
    },
    hotel: {
      destination: "",
      checkIn: null,
      checkOut: null,
    }
  });

  const [price, setPrice] = useState(0);
  const [airports] = useState([
    { code: "DEL", name: "Delhi" },
    { code: "BOM", name: "Mumbai" },
    { code: "BLR", name: "Bengaluru" },
    { code: "MAA", name: "Chennai" },
    { code: "HYD", name: "Hyderabad" },
    { code: "CCU", name: "Kolkata" },
    { code: "GOI", name: "Goa" },
    { code: "PNQ", name: "Pune" },
    { code: "DXB", name: "Dubai International Airport" },
    { code: "LAX", name: "Los Angeles International Airport" },
    { code: "LHR", name: "London Heathrow Airport" },
    { code: "JFK", name: "John F. Kennedy International Airport, New York" },
    { code: "CDG", name: "Charles de Gaulle Airport, Paris" },
    { code: "FRA", name: "Frankfurt am Main Airport" },
    { code: "SIN", name: "Singapore Changi Airport" },
    { code: "ICN", name: "Incheon International Airport, Seoul" },
    { code: "NRT", name: "Narita International Airport, Tokyo" }
     ]);

   // Handle city selection
   const handleCitySelect = (city) => {
     handleInputChange('hotel.destination', city.name);
     setCitySearch(city.name);
     setShowCitySuggestions(false);
   };

   // Handle city input focus
   const handleCityFocus = () => {
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

   // Price calculation
   useEffect(() => {
     const basePrice = activeTab === 'hotel' ? 999 : activeTab === 'both' ? 1499 : 999;
     const calculatedPrice = formData.travelers.count > 0 ?
       (formData.travelers.count * basePrice) : 0;
     setPrice(calculatedPrice);
   }, [formData.travelers.count, activeTab]);

   // Handle form data changes
   const handleInputChange = (path, value) => {
     const keys = path.split('.');
     setFormData(prev => {
       const newData = { ...prev };
       let current = newData;
       for (let i = 0; i < keys.length - 1; i++) {
         current = current[keys[i]];
       }
       current[keys[keys.length - 1]] = value;
       return newData;
     });
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

   // Handle trip type change
   const handleTripTypeChange = (type) => {
     setTripType(type);
     setFormData(prev => {
       let legs = [...prev.flight.legs];
       
       if (type === "one-way") {
         legs = legs.slice(0, 1);
       } else if (type === "round-trip" && legs.length < 2) {
         legs = [
           ...legs,
           { 
             from: legs[0].to, 
             to: legs[0].from, 
             date: null 
           }
         ];
       }
       
       return {
         ...prev,
         flight: {
           ...prev.flight,
           type: type,
           legs
         }
       };
     });
   };

   const validateForm = () => {
     if (activeTab === 'flight') {
       for (const leg of formData.flight.legs) {
         if (!leg.from || !leg.to || !leg.date) {
           alert('Please fill all flight details');
           return false;
         }
       }
     }
     
     if (activeTab === 'hotel') {
       if (!formData.hotel.destination || !formData.hotel.checkIn || !formData.hotel.checkOut) {
         alert('Please fill all hotel details');
         return false;
       }
     }
     
     return true;
   };

   const handleBookNow = () => {
     if (!validateForm()) return;

     // Store the hero form data in sessionStorage to pre-fill the detailed form
     sessionStorage.setItem('heroFormData', JSON.stringify(formData));
     
     // Use onBookingClick if provided (from parent page), otherwise scroll to detailed form
     if (onBookingClick) {
       onBookingClick({ type: activeTab });
     } else {
       // Scroll to the detailed booking section
       const bookingSection = document.getElementById('booking-section');
       if (bookingSection) {
         bookingSection.scrollIntoView({ behavior: 'smooth' });
       }
     }
   };

  return (
    <div className="min-h-screen flex items-start bg-gradient-to-r from-purple-100 to-blue-100 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 lg:col-span-3 mt-8 sm:mt-16 lg:mt-20 order-2 lg:order-1"
          >
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {["Need", " a", " flight", " ticket", " or", " hotel", " reservation", " for", " your", " visa", " application?"].map((word, wordIndex) => (
                    <span key={wordIndex}>
                      {word.split('').map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex}-${charIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.08,
                            delay: (wordIndex * 4 + charIndex) * 0.06
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                There are some countries that have flight & hotel reservations as a mandatory requirement while applying for Visa. However denial of visa application can lead to heavy cancellation costs of flight tickets and hotel reservations. But with Eazy Visas, we make this easy and simple for you.
                <br /><br />
                Book legitimate and verifiable flight tickets and hotel reservations for your visa applications at a fraction of actual cost. You can make reservations for flight & hotel to any destinations or countries instantly. These reservations are acceptable for visa application to any country.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => {
                  setActiveTab('flight');
                  // If onBookingClick is provided (from parent page), use it
                  if (onBookingClick) {
                    onBookingClick({ type: 'flight' });
                  } else {
                    // Otherwise, scroll to the booking form within this component
                    const targetElement = document.getElementById('booking-form');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Book Flight
              </Button>
              <Button
                onClick={() => {
                  setActiveTab('hotel');
                  // If onBookingClick is provided (from parent page), use it
                  if (onBookingClick) {
                    onBookingClick({ type: 'hotel' });
                  } else {
                    // Otherwise, scroll to the booking form within this component
                    const targetElement = document.getElementById('booking-form');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Book Hotels
              </Button>
            </div>
          </motion.div>

          {/* Right Booking Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 w-full self-start relative order-1 lg:order-2"
          >
            {/* Simplified Form Container - Like detailed form but smaller */}
            <div id="booking-form" className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-2 max-w-full sm:max-w-lg lg:max-w-md mx-auto overflow-visible">
              
              {/* Service Type Icons - Top section like detailed form */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('flight')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-150 focus:outline-none ${
                      activeTab === 'flight' 
                        ? 'bg-blue-50 border-b-2 border-blue-500' 
                        : 'hover:bg-gray-50 border-b-2 border-transparent'
                    }`}
                  >
                    <div className="relative w-12 h-12 mb-1">
                      <Image
                        src={activeTab === 'flight' ? '/images/icon/png/aeroplan-blue.png' : '/images/icon/png/aeroplan-black.png'}
                        alt="Flight"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`text-xs font-semibold ${activeTab === 'flight' ? 'text-blue-600' : 'text-gray-600'}`}>Flights</span>
                  </button>
                  
                  {/* Vertical Divider */}
                  <div className="w-px bg-gray-200"></div>
                  
                  <button
                    onClick={() => setActiveTab('hotel')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-150 focus:outline-none ${
                      activeTab === 'hotel' 
                        ? 'bg-blue-50 border-b-2 border-blue-500' 
                        : 'hover:bg-gray-50 border-b-2 border-transparent'
                    }`}
                  >
                    <div className="relative w-12 h-12 mb-1">
                      <Image
                        src={activeTab === 'hotel' ? '/images/icon/png/hotel-blue.png' : '/images/icon/png/hotel-black.png'}
                        alt="Hotel"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`text-xs font-semibold ${activeTab === 'hotel' ? 'text-blue-600' : 'text-gray-600'}`}>Hotels</span>
                  </button>
                </div>
              </div>

              {/* Step Progress Indicator */}
              <div className="flex items-center justify-center mb-4 px-2">
                <div className="flex items-center space-x-1 sm:space-x-2 w-full max-w-xs sm:max-w-none">
                  <div className="flex items-center flex-1 sm:flex-none">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <span className="ml-1 sm:ml-2 text-xs font-medium text-gray-700 truncate">
                      <span className="hidden sm:inline">
                        {activeTab === 'flight' ? 'Flight Details' : 'Hotel Details'}
                      </span>
                      <span className="sm:hidden">
                        {activeTab === 'flight' ? 'Flight' : 'Hotel'}
                      </span>
                    </span>
                  </div>
                  <div className="w-4 sm:w-12 h-px bg-gray-300 flex-shrink-0"></div>
                  <div className="flex items-center flex-1 sm:flex-none">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      2
                    </div>
                    <span className="ml-1 sm:ml-2 text-xs font-medium text-gray-500 truncate">Review</span>
                  </div>
                  <div className="w-4 sm:w-12 h-px bg-gray-300 flex-shrink-0"></div>
                  <div className="flex items-center flex-1 sm:flex-none">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      3
                    </div>
                    <span className="ml-1 sm:ml-2 text-xs font-medium text-gray-500 truncate">Payment</span>
                  </div>
                </div>
              </div>
            

            {/* Trip Type - Only show for flight */}
            {activeTab === 'flight' && (
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-2">
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={formData.flight.type === 'one-way'}
                      onChange={(e) => handleTripTypeChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-0 focus:outline-none"
                    />
                    <span className="ml-2 text-xs sm:text-sm font-medium text-blue-600">ONE WAY</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="round-trip"
                      checked={formData.flight.type === 'round-trip'}
                      onChange={(e) => handleTripTypeChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-0 focus:outline-none"
                    />
                    <span className="ml-2 text-xs sm:text-sm font-medium text-blue-600">ROUND TRIP</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="multi-city"
                      checked={formData.flight.type === 'multi-city'}
                      onChange={(e) => handleTripTypeChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-0 focus:outline-none"
                    />
                    <span className="ml-2 text-xs sm:text-sm font-medium text-blue-600">MULTI TRIP</span>
                  </label>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-2">
              {/* Flight Fields */}
              {activeTab === 'flight' && (
                <>
                  {/* Route Section - Wide Layout */}
                  <div className="bg-gray-50 rounded-lg p-2">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Flight Route</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <AirportDropdown
                          value={formData.flight.legs[0].from}
                          onChange={(value) => handleFlightLegChange(0, 'from', value)}
                          label="From"
                          options={airports}
                          placeholderSize="sm"
                        />
                      </div>
                      <div>
                        <AirportDropdown
                          value={formData.flight.legs[0].to}
                          onChange={(value) => handleFlightLegChange(0, 'to', value)}
                          label="To"
                          options={airports}
                          placeholderSize="sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Date Section - Side by Side */}
                  <div className={`grid gap-1.5 ${formData.flight.type === 'round-trip' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} overflow-visible`}>
                    <div className="bg-gray-50 rounded-lg p-2 overflow-visible">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Departure Date</label>
                      <div className="relative overflow-visible">
                        <ReactDatePicker
                          selected={formData.flight.legs[0].date ? new Date(formData.flight.legs[0].date) : null}
                          onChange={(date) => {
                            if (date) {
                              handleFlightLegChange(0, 'date', date.toISOString());
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select departure date"
                          className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white pr-8"
                          calendarClassName="custom-datepicker"
                          showPopperArrow={false}
                          minDate={new Date()}
                          wrapperClassName="w-full"
                        />
                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none z-10" />
                      </div>
                    </div>
                    {formData.flight.type === 'round-trip' && (
                      <div className="bg-gray-50 rounded-lg p-2 overflow-visible">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Return Date</label>
                        <div className="relative overflow-visible">
                          <ReactDatePicker
                            selected={formData.flight.legs[1]?.date ? new Date(formData.flight.legs[1].date) : null}
                            onChange={(date) => {
                              if (date) {
                                handleFlightLegChange(1, 'date', date.toISOString());
                              }
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select return date"
                            className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white pr-8"
                            calendarClassName="custom-datepicker"
                            showPopperArrow={false}
                            minDate={formData.flight.legs[0].date ? new Date(formData.flight.legs[0].date) : new Date()}
                            wrapperClassName="w-full"
                            popperClassName="z-50"
                            popperPlacement="bottom"
                            popperModifiers={[
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, 5],
                                },
                              },
                            ]}
                          />
                          <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none z-10" />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Hotel Fields */}
              {activeTab === 'hotel' && (
                <>
                  {/* Location Section - Wide Layout */}
                  <div className="bg-gray-50 rounded-lg p-2" ref={cityInputRef}>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">City, Property Name or Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Where do you want to stay?"
                        value={formData.hotel.destination}
                        onChange={(e) => {
                          handleInputChange('hotel.destination', e.target.value);
                          setCitySearch(e.target.value);
                        }}
                        onFocus={handleCityFocus}
                        className="w-full h-10 px-2 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>

                      {/* City Suggestions Dropdown */}
                      {showCitySuggestions && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-48 overflow-auto">
                          {filteredCities.length > 0 ? (
                            filteredCities.map((city) => (
                              <div
                                key={city.id}
                                className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center text-xs"
                                onClick={() => handleCitySelect(city)}
                              >
                                <span className="font-medium">{city.name}</span>
                                <span className="text-gray-500">{city.country}</span>
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-gray-500 text-xs">No cities found</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Date Section - Side by Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 overflow-visible">
                    <div className="bg-gray-50 rounded-lg p-2 overflow-visible">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Check-In Date</label>
                      <div className="relative overflow-visible">
                        <ReactDatePicker
                          selected={formData.hotel.checkIn ? new Date(formData.hotel.checkIn) : null}
                          onChange={(date) => {
                            if (date) {
                              handleInputChange('hotel.checkIn', date.toISOString());
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select check-in date"
                          className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white pr-8"
                          calendarClassName="custom-datepicker"
                          showPopperArrow={false}
                          minDate={new Date()}
                          wrapperClassName="w-full"
                          popperClassName="z-50"
                          popperPlacement="bottom"
                          popperModifiers={[
                            {
                              name: 'offset',
                              options: {
                                offset: [0, 5],
                              },
                            },
                          ]}
                        />
                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none z-10" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 overflow-visible">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Check-Out Date</label>
                      <div className="relative overflow-visible">
                        <ReactDatePicker
                          selected={formData.hotel.checkOut ? new Date(formData.hotel.checkOut) : null}
                          onChange={(date) => {
                            if (date) {
                              handleInputChange('hotel.checkOut', date.toISOString());
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select check-out date"
                          className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white pr-8"
                          calendarClassName="custom-datepicker"
                          showPopperArrow={false}
                          minDate={formData.hotel.checkIn ? new Date(formData.hotel.checkIn) : new Date()}
                          wrapperClassName="w-full"
                          popperClassName="z-50"
                          popperPlacement="bottom"
                          popperModifiers={[
                            {
                              name: 'offset',
                              options: {
                                offset: [0, 5],
                              },
                            },
                          ]}
                        />
                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none z-10" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Price Display */}
            {price > 0 && (
              <div className="mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Total Price for {formData.travelers.count} traveler{formData.travelers.count > 1 ? 's' : ''}:
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-blue-600">₹{price}</span>
                </div>
              </div>
            )}

              {/* Book Now Button */}
              <Button
                onClick={handleBookNow}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-2.5 px-4 rounded-lg text-sm sm:text-base font-semibold shadow-lg transform transition hover:scale-105"
              >
                BUY DUMMY TICKET - ₹{price}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBookingSection; 