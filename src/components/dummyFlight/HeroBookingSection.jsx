"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaCheck, FaArrowRight } from 'react-icons/fa';
import { MdFlight, MdHotel } from 'react-icons/md';
import Image from 'next/image';
import Button from '../common/Button';
import AirportDropdown from './AirportDropdown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { format } from 'date-fns';

const HeroBookingSection = () => {
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
    <div className="min-h-screen flex items-start bg-gradient-to-r from-purple-100 to-blue-100 relative">
      <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto py-6">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:col-span-3 mt-40"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {["Get", " Your", " Dummy", " "].map((word, wordIndex) => (
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
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {["Ticket", " At", " "].map((word, wordIndex) => (
                    <span key={wordIndex + 4}>
                      {word.split('').map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex + 4}-${charIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                                                     transition={{
                             duration: 0.08,
                             delay: ((wordIndex + 4) * 4 + charIndex) * 0.06
                           }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                  <motion.span 
                    className="text-blue-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.08,
                      delay: 7 * 4 * 0.06
                    }}
                  >
                    {"$5".split('').map((char, charIndex) => (
                      <motion.span
                        key={`price-${charIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.08,
                          delay: (7 * 4 + charIndex) * 0.06
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                For visa application/immigration/proof of return/passport renewal/visa extension.
                We Offer Genuine Dummy Ticket At A Reasonable Price <br />
                Within 60 Minutes
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                onClick={() => {
                  const bookingSection = document.getElementById('booking-section');
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                Book Now
              </Button>
            </div>
          </motion.div>

          {/* Right Booking Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 w-full self-start relative"
          >
            {/* Simplified Form Container - Like detailed form but smaller */}
            <div id="booking-form" className="bg-white rounded-2xl shadow-2xl p-2 max-w-md mx-auto">
              
              {/* Service Type Icons - Top section like detailed form */}
              <div className="bg-gray-100 rounded-xl p-1.5 mb-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveTab('flight')}
                    className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all duration-300 ${
                      activeTab === 'flight'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-white'
                    }`}
                  >
                    <div className="relative w-12 h-12 mb-0.5">
                      <Image
                        src={activeTab === 'flight' ? '/images/icon/png/aeroplan-blue.png' : '/images/icon/png/aeroplan-black.png'}
                        alt="Flight"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-semibold">Flights</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('hotel')}
                    className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all duration-300 ${
                      activeTab === 'hotel'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-white'
                    }`}
                  >
                    <div className="relative w-12 h-12 mb-0.5">
                      <Image
                        src={activeTab === 'hotel' ? '/images/icon/png/hotel-blue.png' : '/images/icon/png/hotel-black.png'}
                        alt="Hotel"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-semibold">Hotels</span>
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
              <div className="bg-blue-50 rounded-lg p-4 mb-2">
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={formData.flight.type === 'one-way'}
                      onChange={(e) => handleTripTypeChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-0 focus:outline-none"
                    />
                    <span className="ml-2 text-xs font-medium text-blue-600">ONE WAY</span>
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
                    <span className="ml-2 text-xs font-medium text-blue-600">ROUND TRIP</span>
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
                    <span className="ml-2 text-xs font-medium text-blue-600">MULTI TRIP</span>
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
                  
                  {/* Date Section - Small Boxes */}
                  <div className="grid grid-cols-1 gap-1.5">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Departure Date</label>
                                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                         <DatePicker
                           value={formData.flight.legs[0].date ? new Date(formData.flight.legs[0].date) : null}
                           onChange={(newValue) => {
                             if (newValue) {
                               handleFlightLegChange(0, 'date', newValue.toISOString());
                             }
                           }}
                           renderInput={(params) => (
                             <TextField
                               {...params}
                               size="small"
                               fullWidth
                               sx={{
                                 '& .MuiOutlinedInput-root': {
                                   height: '32px',
                                   borderRadius: '0.375rem',
                                   fontSize: '0.75rem',
                                   '& fieldset': {
                                     borderColor: 'rgb(209, 213, 219)',
                                   },
                                   '&:hover fieldset': {
                                     borderColor: 'rgb(59, 130, 246)',
                                   },
                                   '&.Mui-focused fieldset': {
                                     borderColor: 'rgb(59, 130, 246)',
                                     borderWidth: '1px',
                                   },
                                 },
                                 '& .MuiInputBase-input': {
                                   padding: '4px 8px',
                                   fontSize: '0.75rem',
                                 },
                               }}
                             />
                           )}
                         />
                       </LocalizationProvider>
                    </div>
                    {formData.flight.type === 'round-trip' && (
                      <div className="bg-gray-50 rounded-lg p-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Return Date</label>
                                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                           <DatePicker
                             value={formData.flight.legs[1]?.date ? new Date(formData.flight.legs[1].date) : null}
                             onChange={(newValue) => {
                               if (newValue) {
                                 handleFlightLegChange(1, 'date', newValue.toISOString());
                               }
                             }}
                             renderInput={(params) => (
                               <TextField
                                 {...params}
                                 size="small"
                                 fullWidth
                                 sx={{
                                   '& .MuiOutlinedInput-root': {
                                     height: '32px',
                                     borderRadius: '0.375rem',
                                     fontSize: '0.75rem',
                                     '& fieldset': {
                                       borderColor: 'rgb(209, 213, 219)',
                                     },
                                     '&:hover fieldset': {
                                       borderColor: 'rgb(59, 130, 246)',
                                     },
                                     '&.Mui-focused fieldset': {
                                       borderColor: 'rgb(59, 130, 246)',
                                       borderWidth: '1px',
                                     },
                                   },
                                   '& .MuiInputBase-input': {
                                     padding: '4px 8px',
                                     fontSize: '0.75rem',
                                   },
                                 }}
                               />
                             )}
                           />
                         </LocalizationProvider>
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
                        className="w-full px-2 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Date Section - Small Boxes Grid */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Check-In Date</label>
                                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                         <DatePicker
                           value={formData.hotel.checkIn ? new Date(formData.hotel.checkIn) : null}
                           onChange={(newValue) => {
                             if (newValue) {
                               handleInputChange('hotel.checkIn', newValue.toISOString());
                             }
                           }}
                           renderInput={(params) => (
                             <TextField
                               {...params}
                               size="small"
                               fullWidth
                               sx={{
                                 '& .MuiOutlinedInput-root': {
                                   height: '32px',
                                   borderRadius: '0.375rem',
                                   fontSize: '0.75rem',
                                   '& fieldset': {
                                     borderColor: 'rgb(209, 213, 219)',
                                   },
                                   '&:hover fieldset': {
                                     borderColor: 'rgb(59, 130, 246)',
                                   },
                                   '&.Mui-focused fieldset': {
                                     borderColor: 'rgb(59, 130, 246)',
                                     borderWidth: '1px',
                                   },
                                 },
                                 '& .MuiInputBase-input': {
                                   padding: '4px 8px',
                                   fontSize: '0.75rem',
                                 },
                               }}
                             />
                           )}
                         />
                       </LocalizationProvider>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Check-Out Date</label>
                                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                         <DatePicker
                           value={formData.hotel.checkOut ? new Date(formData.hotel.checkOut) : null}
                           onChange={(newValue) => {
                             if (newValue) {
                               handleInputChange('hotel.checkOut', newValue.toISOString());
                             }
                           }}
                           renderInput={(params) => (
                             <TextField
                               {...params}
                               size="small"
                               fullWidth
                               sx={{
                                 '& .MuiOutlinedInput-root': {
                                   height: '32px',
                                   borderRadius: '0.375rem',
                                   fontSize: '0.75rem',
                                   '& fieldset': {
                                     borderColor: 'rgb(209, 213, 219)',
                                   },
                                   '&:hover fieldset': {
                                     borderColor: 'rgb(59, 130, 246)',
                                   },
                                   '&.Mui-focused fieldset': {
                                     borderColor: 'rgb(59, 130, 246)',
                                     borderWidth: '1px',
                                   },
                                 },
                                 '& .MuiInputBase-input': {
                                   padding: '4px 8px',
                                   fontSize: '0.75rem',
                                 },
                               }}
                             />
                           )}
                         />
                       </LocalizationProvider>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Price Display */}
            {price > 0 && (
              <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Total Price for {formData.travelers.count} traveler{formData.travelers.count > 1 ? 's' : ''}:
                  </span>
                  <span className="text-lg font-bold text-blue-600">₹{price}</span>
                </div>
              </div>
            )}

              {/* Book Now Button */}
              <Button
                onClick={handleBookNow}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-lg transform transition hover:scale-105"
              >
                BUY DUMMY TICKET - ₹{price}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Feature Cards - Half overlapping hero and next section */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-2/3 z-20 mb-2">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 w-full max-w-sm"
            >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-green-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaCheck className="text-green-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">Legitimate & Verifiable</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">Book legitimate and verifiable flight tickets and hotel reservations for your visa applications. All our documents are authentic and can be verified.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 w-full max-w-sm"
            >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaPlane className="text-blue-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">Instant PDF</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">Instantly download PDF confirmations for your bookings. Get your dummy tickets delivered within minutes of payment confirmation.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 w-full max-w-sm"
            >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-purple-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaCheck className="text-purple-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">Unlimited Revisions</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">Unlimited date revisions, if you happen to change your travel schedule. We understand plans can change and we&apos;re here to help.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 group cursor-pointer relative overflow-hidden h-48 w-full max-w-sm"
            >
              <div className="text-center h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-red-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:opacity-0">
                  <FaCheck className="text-red-600 text-lg" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-white mb-2 text-base transition-all duration-300 group-hover:opacity-0">No Cancellation Fee</h4>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-gray-600 group-hover:text-white text-xs">Hover for details</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-3 flex items-center justify-center">
                  <p className="text-xs leading-relaxed text-center text-white">No hidden charges or cancellation fees involved. What you see is what you pay - transparent pricing with no surprises.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBookingSection; 