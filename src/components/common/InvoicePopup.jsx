"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiX, BiReceipt, BiCalendar, BiUser, BiCreditCard } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { usePathname } from 'next/navigation';

const InvoicePopup = ({ isOpen, onClose, selectedDate, formData, onPayNow }) => {
  const pathname = usePathname();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get country name from formData or URL path as fallback
  const getCountryName = () => {
    // First priority: use formData.country if available
    if (formData?.country) {
      return formData.country.toLowerCase();
    }
    
    // Fallback: extract from pathname for direct country page visits
    if (pathname && pathname.includes('/countries/')) {
      const pathParts = pathname.split('/');
      const countryIndex = pathParts.indexOf('countries');
      
      // Handle URL structure like /countries/asia/japan
      if (countryIndex !== -1 && pathParts[countryIndex + 2]) {
        return pathParts[countryIndex + 2].replace(/-/g, ' ').toLowerCase();
      }
      // Fallback for direct country URLs like /countries/japan
      else if (countryIndex !== -1 && pathParts[countryIndex + 1]) {
        return pathParts[countryIndex + 1].replace(/-/g, ' ').toLowerCase();
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const countryName = getCountryName();
        if (!countryName) {
          setLoading(false);
          return;
        }

        // Import country data dynamically
        const { countryData } = await import('../../data/countryData.js');
        
        // Find matching country (case-insensitive search)
        const country = countryData.find(c => 
          c.name.toLowerCase() === countryName ||
          c.searchName?.toLowerCase() === countryName ||
          c.name.toLowerCase().includes(countryName) ||
          countryName.includes(c.name.toLowerCase())
        );

        console.log('Country search:', { countryName, foundCountry: country, price: country?.price });
        setCountryData(country);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCountryData();
    }
  }, [isOpen, pathname]);

  const consultationFee = 2500;
  const visaFee = countryData ? parseInt(countryData.price) || 0 : 0;
  const totalAmount = visaFee + consultationFee;

  console.log('Invoice calculation:', { countryData: countryData?.name, price: countryData?.price, visaFee, totalAmount });

  const invoiceItems = [
    {
      description: `${countryData?.name || 'Country'} Visa Processing Fee`,
      amount: visaFee,
      icon: <BiReceipt className="text-blue-500" />
    },
    {
      description: "Expert Consultation Fee",
      amount: consultationFee,
      icon: <BiUser className="text-green-500" />
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <BiReceipt className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Booking Invoice</h3>
                  <p className="text-sm opacity-90">Consultation & Visa Processing</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <BiX className="text-2xl" />
              </motion.button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* Main Content - Side by Side Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Booking Details */}
                  <div className="flex-1">
                    {/* Booking Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <BiUser className="mr-2" />
                            Client Name
                          </span>
                          <span className="font-medium">{formData?.firstName} {formData?.lastName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 flex items-center">
                            <BiCalendar className="mr-2" />
                            Consultation Date
                          </span>
                          <span className="font-medium">{selectedDate ? selectedDate.toDateString() : 'Not selected'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Country</span>
                          <span className="font-medium">{countryData?.name || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Visa Type</span>
                          <span className="font-medium">{formData?.visaType || 'Tourist Visa'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <BiCreditCard className="inline mr-2" />
                        Secure payment processing with multiple payment options including UPI, cards, and net banking.
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Fee Breakdown */}
                  <div className="flex-1 lg:border-l lg:pl-6 border-gray-200">
                    {/* Invoice Items */}
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-gray-800">Fee Breakdown</h4>
                      
                      {invoiceItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon}
                            <span className="text-gray-700">{item.description}</span>
                          </div>
                          <span className="font-semibold text-gray-800">₹{item.amount.toLocaleString()}</span>
                        </motion.div>
                      ))}

                      {/* Total */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="border-t pt-4 mt-4"
                      >
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span className="text-gray-800">Total Amount</span>
                          <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Pay Now Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onPayNow({
                        amount: totalAmount,
                        visaFee,
                        consultationFee,
                        country: countryData?.name,
                        clientName: `${formData?.firstName} ${formData?.lastName}`,
                        consultationDate: selectedDate,
                        visaType: formData?.visaType
                      })}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <span>Pay Now - ₹{totalAmount.toLocaleString()}</span>
                      <FiArrowRight className="text-lg" />
                    </motion.button>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By proceeding with payment, you agree to our terms and conditions. 
                      Consultation fee is non-refundable.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvoicePopup;