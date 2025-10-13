"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BiCreditCard, 
  BiMobile, 
  BiShield, 
  BiArrowBack, 
  BiCheck,
  BiX,
  BiLock
} from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";

const PaymentGateway = ({ paymentData, onBack, onPaymentSuccess, onPaymentCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', null

  // Temporarily disable payment functionality
  const IS_PAYMENT_ACTIVE = false;

  // Safe date formatting for rendering
  const formatDate = (d) => {
    if (!d) return 'Not specified';
    if (d instanceof Date) return d.toDateString();
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? String(d) : parsed.toDateString();
  };
  const consultationDateStr = formatDate(paymentData?.consultationDate);

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: <BiMobile className="text-2xl" />,
      description: "Pay using UPI ID or QR code",
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <BiCreditCard className="text-2xl" />,
      description: "Visa, Mastercard, RuPay accepted",
      popular: false
    }
  ];

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow 3-4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validatePayment = () => {
    if (selectedMethod === 'upi') {
      return upiId.includes('@') && upiId.length > 5;
    } else if (selectedMethod === 'card') {
      return cardData.number.replace(/\s/g, '').length >= 16 &&
             cardData.expiry.length === 5 &&
             cardData.cvv.length >= 3 &&
             cardData.name.length > 0;
    }
    return false;
  };

  const processPayment = async () => {
    // Early exit when payment is not active
    if (!IS_PAYMENT_ACTIVE) return;

    if (!validatePayment()) return;
    setIsProcessing(true);
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const isSuccess = Math.random() > 0.1;
      if (isSuccess) {
        setPaymentStatus('success');
        setTimeout(() => {
          onPaymentSuccess({
            transactionId: `TXN${Date.now()}`,
            method: selectedMethod,
            amount: paymentData.amount,
            timestamp: new Date().toISOString()
          });
        }, 2000);
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus(null);
    setIsProcessing(false);
  };

  if (paymentStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BiCheck className="text-4xl text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your consultation has been booked successfully. You will receive a confirmation email shortly.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold">₹{paymentData.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm">TXN{Date.now()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="text-sm">{consultationDateStr}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BiX className="text-4xl text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetPayment}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold"
            >
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPaymentCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BiArrowBack className="text-xl text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Secure Payment</h1>
                <p className="text-sm text-gray-600">Complete your consultation booking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <BiShield className="text-xl" />
              <span className="text-sm font-medium">256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>
              
              {/* Payment Method Selection */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {method.popular && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedMethod === method.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payment Form */}
              <AnimatePresence mode="wait">
                {selectedMethod === 'upi' && (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@paytm"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <BiMobile className="inline mr-2" />
                        Enter your UPI ID (e.g., 9876543210@paytm, name@googlepay)
                      </p>
                    </div>
                  </motion.div>
                )}

                {selectedMethod === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => handleCardInputChange('number', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardData.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => handleCardInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        <BiLock className="inline mr-2" />
                        Your card details are encrypted and secure
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pay Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={processPayment}
                disabled={!IS_PAYMENT_ACTIVE || !validatePayment() || isProcessing}
                className={`w-full mt-8 py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                  validatePayment() && !isProcessing && IS_PAYMENT_ACTIVE
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{paymentData.amount.toLocaleString()}</span>
                    <FiArrowRight className="text-lg" />
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Client</span>
                  <span className="font-medium">{paymentData.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium">{paymentData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{consultationDateStr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visa Type</span>
                  <span className="font-medium">{paymentData.visaType}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Visa Processing Fee</span>
                  <span>₹{paymentData.visaFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span>₹{paymentData.consultationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-blue-600">₹{paymentData.amount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <BiShield className="inline mr-2" />
                  100% secure payment with bank-level encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;