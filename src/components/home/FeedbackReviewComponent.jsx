"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../common/Layout";

const FeedbackReviewComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // ✅ Load Elfsight Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Handle Star Selection
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setShowPopup(false);

    if (rating >= 4) {
      window.open("https://www.google.com/maps/place/JM+Visa+Services/@19.1107798,73.0050874,350m/data=!3m1!1e3!4m8!3m7!1s0x4f174af374b22233:0x39a66841cc7cfdd5!8m2!3d19.1107866!4d73.006725!9m1!1b1!16s%2Fg%2F11txqcs1k4?hl=en&entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D", "_blank");
    } else {
      setShowThankYouPopup(true);
    }
  };

  // ✅ Handle Message Submission
  const handleSubmitMessage = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submitFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setNotification({ type: "success", message: "Your message has been submitted." });
      } else {
        setNotification({ type: "error", message: "Error submitting your message." });
      }
    } catch (error) {
      setNotification({ type: "error", message: "Error submitting your message." });
    } finally {
      setIsSubmitting(false);
      setShowThankYouPopup(false);
      setMessage("");

      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <section className="py-16">
     
      <div className=" text-left">
        {/* ✅ Heading */}
        <div className="mb-6 ">
          <div>
            <p className="inline-block mb-3 px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
              ✈️ Feedback
            </p>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
              See What Our <br className="sm:hidden" />
              <span className="text-blue-500">Happy Clients</span> Say
            </h1>
          </div>
          {/* <button
            onClick={() => setShowPopup(true)}
            className="px-6 text-sm py-[10px] bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-900"
          >
            Leave Review
          </button> */}
        </div>

        {/* ✅ Elfsight Reviews Widget */}
        <div className="elfsight-app-26bc4903-85bd-4d74-9e7f-426cfd6ab3ce" data-elfsight-app-lazy></div>
      </div>

      {/* ✅ Star Rating Popup */}
      {showPopup && (
        <div className="fixed w-full h-screen z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`text-3xl ${star <= selectedRating ? "text-yellow-500" : "text-gray-400"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Thank You & Message Popup */}
      {showThankYouPopup && (
        <div className="fixed w-full h-screen z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 relative">
            <button
              onClick={() => setShowThankYouPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold my-4 text-green-500">Thank you for your feedback!</h2>

            {/* ✅ Message Input for Low Ratings */}
            {selectedRating < 4 && (
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message (optional)"
                  className="w-full p-3 border rounded-md border-gray-300"
                  rows={4}
                ></textarea>
                <button
                  onClick={handleSubmitMessage}
                  className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                  disabled={!message.trim() || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ Notification Popup */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          duration={0.5}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="text-white font-semibold">{notification.message}</p>
        </motion.div>
      )}
     
    </section>
  );
};

export default FeedbackReviewComponent;
