"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaCheck, FaArrowRight } from 'react-icons/fa';
import { MdFlight, MdHotel } from 'react-icons/md';
import Button from '../common/Button';
import AirportDropdown from './AirportDropdown';

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
     if (activeTab === 'flight' || activeTab === 'both') {
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
     
     if (activeTab === 'both') {
       if (!formData.flight.legs[0].from || !formData.flight.legs[0].to || !formData.flight.legs[0].date || !formData.hotel.destination) {
         alert('Please fill all required details');
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
       } else if (activeTab === 'both') {
         response = await fetch('/api/most-preferred-booking', {
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
             },
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
    <div className="min-h-screen flex items-start bg-gradient-to-r from-blue-100 via-blue-200 to-white">
      <div className="max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[50px] lg:mx-[20px] xl:mx-[50px] 2xl:mx-auto py-6">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:col-span-3 mt-40"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Get Your Dummy <br />Ticket At <span className="text-blue-600">$5</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                For visa application/immigration/proof of return/passport renewal/visa extension.
                We Offer Genuine Dummy Ticket At A Reasonable Price <br />
                Within 60 Minutes
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-lg transform transition hover:scale-105"
              >
                Buy Dummy Ticket
              </Button>
            </div>
          </motion.div>

          {/* Right Booking Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-3 md:p-4 lg:col-span-2 w-full self-start"
          >
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('flight')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md font-medium transition ${
                  activeTab === 'flight'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <MdFlight className="mr-2" />
                FLIGHT
              </button>
              <button
                onClick={() => setActiveTab('hotel')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md font-medium transition ${
                  activeTab === 'hotel'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <MdHotel className="mr-2" />
                HOTEL
              </button>
              <button
                onClick={() => setActiveTab('both')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md font-medium transition ${
                  activeTab === 'both'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                BOTH
              </button>
            </div>

            {/* Trip Type - Only show for flight */}
            {(activeTab === 'flight' || activeTab === 'both') && (
              <div className="flex space-x-6 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={formData.flight.type === 'one-way'}
                    onChange={(e) => handleTripTypeChange(e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">ONE WAY</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={formData.flight.type === 'round-trip'}
                    onChange={(e) => handleTripTypeChange(e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">ROUND TRIP</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="multi-city"
                    checked={formData.flight.type === 'multi-city'}
                    onChange={(e) => handleTripTypeChange(e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">MULTI TRIP</span>
                </label>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-3">
              {/* From and To Fields */}
              {(activeTab === 'flight' || activeTab === 'both') && (
                <>
                  <div>
                    <AirportDropdown
                      value={formData.flight.legs[0].from}
                      onChange={(value) => handleFlightLegChange(0, 'from', value)}
                      label="FROM"
                      options={airports}
                    />
                  </div>
                  <div>
                    <AirportDropdown
                      value={formData.flight.legs[0].to}
                      onChange={(value) => handleFlightLegChange(0, 'to', value)}
                      label="TO"
                      options={airports}
                    />
                  </div>
                </>
              )}

              {/* Hotel specific fields */}
              {activeTab === 'hotel' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DESTINATION</label>
                  <input
                    type="text"
                    placeholder="Hotel Destination"
                    value={formData.hotel.destination}
                    onChange={(e) => handleInputChange('hotel.destination', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Both tab hotel destination */}
              {activeTab === 'both' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HOTEL DESTINATION</label>
                                     <input
                     type="text"
                     placeholder="Hotel City/Destination"
                     value={formData.hotel.destination}
                     onChange={(e) => handleInputChange('hotel.destination', e.target.value)}
                     className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                </div>
              )}

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {activeTab === 'hotel' ? 'CHECK-IN' : 'DEPARTURE'}
                  </label>
                                      <input
                      type="date"
                      value={activeTab === 'hotel' ? (formData.hotel.checkIn || '') : (formData.flight.legs[0].date || '')}
                      onChange={(e) => {
                        if (activeTab === 'hotel') {
                          handleInputChange('hotel.checkIn', e.target.value);
                        } else {
                          handleFlightLegChange(0, 'date', e.target.value);
                        }
                      }}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {(formData.flight.type === 'round-trip' || activeTab === 'hotel' || activeTab === 'both') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {activeTab === 'hotel' ? 'CHECK-OUT' : 'RETURN'}
                    </label>
                                          <input
                        type="date"
                        value={activeTab === 'hotel' ? (formData.hotel.checkOut || '') : (formData.flight.legs[1]?.date || '')}
                        onChange={(e) => {
                          if (activeTab === 'hotel') {
                            handleInputChange('hotel.checkOut', e.target.value);
                          } else if (formData.flight.legs[1]) {
                            handleFlightLegChange(1, 'date', e.target.value);
                          }
                        }}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                  </div>
                )}
              </div>
            </div>

            {/* Price Display */}
            {price > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">
                    Total Price for {formData.travelers.count} traveler{formData.travelers.count > 1 ? 's' : ''}:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">₹{price}</span>
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <Button
              onClick={handleBookNow}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transform transition hover:scale-105"
            >
              BUY DUMMY TICKET - ₹{price}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBookingSection; 