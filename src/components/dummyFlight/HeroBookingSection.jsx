"use client";
import { useState, useEffect } from 'react';
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
  
  // Form data structure similar to original
  const [formData, setFormData] = useState({
    contact: {
      email: "",
      phone: "",
      phoneCode: "+91",
    },
    flight: {
      type: "one-way",
      legs: [{ from: "DEL", to: "BOM", date: null }],
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

   // Price calculation
   useEffect(() => {
     const basePrice = activeTab === 'hotel' ? 999 : activeTab === 'both' ? 1499 : 999;
     const discount = 1; // ₹1 discount per person
     const calculatedPrice = formData.travelers.count > 0 ?
       (formData.travelers.count * basePrice) - discount : 0;
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

   const handleBookNow = async () => {
     if (!validateForm()) return;

     try {
       let response;
       
       if (activeTab === 'flight') {
         response = await fetch('/api/flight-booking', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             ...formData,
             price: price,
             flight: {
               ...formData.flight,
               legs: formData.flight.legs.map(leg => ({
                 ...leg,
                 date: leg.date ? new Date(leg.date).toISOString() : null
               }))
             }
           }),
         });
       } else if (activeTab === 'hotel') {
         response = await fetch('/api/hotel-booking', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             ...formData,
             price: price,
             hotel: {
               ...formData.hotel,
               checkIn: formData.hotel.checkIn ? new Date(formData.hotel.checkIn).toISOString() : null,
               checkOut: formData.hotel.checkOut ? new Date(formData.hotel.checkOut).toISOString() : null
             }
           }),
         });
       }

       if (response && response.ok) {
         sessionStorage.setItem('formSubmitted', 'true');
         sessionStorage.setItem('bookingPrice', price.toString());
         window.location.href = '/thank-you';
       } else {
         alert('Error submitting booking. Please try again.');
       }
     } catch (error) {
       console.error('Error submitting booking:', error);
       alert('Error submitting booking. Please try again.');
     }
   };

  return (
    <div className="min-h-screen flex items-start bg-gradient-to-r from-purple-100 to-blue-100 relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 lg:col-span-3 mt-8 sm:mt-16 lg:mt-10 order-2 lg:order-1"
          >
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
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
                <br className="hidden sm:block" />
                <br className="hidden sm:block" />
                Book legitimate and verifiable flight tickets and hotel reservations for your visa applications at a fraction of actual cost. You can make reservations for flight & hotel to any destinations or countries instantly. These reservations are acceptable for visa application to any country.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
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
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
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
            <div id="booking-form" className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-2 max-w-full sm:max-w-lg lg:max-w-md mx-auto">
              
              {/* Service Type Icons - Top section like detailed form */}
              <div className="bg-gray-100 rounded-xl p-1.5 mb-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveTab('flight')}
                    className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all duration-300"
                  >
                    <div className="relative w-16 h-16 mb-0.5">
                      <Image
                        src={activeTab === 'flight' ? '/images/icon/png/aeroplan-blue.png' : '/images/icon/png/aeroplan-black.png'}
                        alt="Flight"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`text-xs font-semibold ${activeTab === 'flight' ? 'text-blue-600' : 'text-gray-600'}`}>Flights</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('hotel')}
                    className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all duration-300"
                  >
                    <div className="relative w-16 h-16 mb-0.5">
                      <Image
                        src={activeTab === 'hotel' ? '/images/icon/png/hotel-blue.png' : '/images/icon/png/hotel-black.png'}
                        alt="Hotel"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`text-xs font-semibold ${activeTab === 'hotel' ? 'text-blue-600' : 'text-gray-600'}`}>Hotels</span>
                  </button>
                </div>
              </div>

              {/* Section Title */}
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  {activeTab === 'flight' ? 'Flight Details' : 'Hotels Details'}
                </h3>
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
                        />
                      </div>
                      <div>
                        <AirportDropdown
                          value={formData.flight.legs[0].to}
                          onChange={(value) => handleFlightLegChange(0, 'to', value)}
                          label="To"
                          options={airports}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Date Section - Side by Side */}
                  <div className={`grid gap-1.5 ${formData.flight.type === 'round-trip' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Departure Date</label>
                      <div className="relative">
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
                      <div className="bg-gray-50 rounded-lg p-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Return Date</label>
                        <div className="relative">
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
                  <div className="bg-gray-50 rounded-lg p-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">City, Property Name or Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Where do you want to stay?"
                        value={formData.hotel.destination}
                        onChange={(e) => handleInputChange('hotel.destination', e.target.value)}
                        className="w-full h-10 px-2 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Date Section - Side by Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Check-In Date</label>
                      <div className="relative">
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
                        />
                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none z-10" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Check-Out Date</label>
                      <div className="relative">
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