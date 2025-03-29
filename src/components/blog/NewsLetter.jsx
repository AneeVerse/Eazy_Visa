"use client";

import { useState } from "react";
import { FiMail, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      setError("Subscription failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 mt-12"
    >
      <div className="p-8 md:p-10">
        {isSubscribed ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You for Subscribing!
            </h2>
            <p className="text-gray-600">
              You'll receive our latest updates directly to your inbox.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-2">
            <h2 className="text-center text-xl font-semibold text-gray-900">
          Newsletter Updates
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Enter your email address below and subscribe to our newsletter
        </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address *"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Subscribe
                      <FiMail className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Newsletter;