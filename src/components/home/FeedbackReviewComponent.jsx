"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../common/Layout";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const reviews = [
  {
    name: "Ashish Dwivedi",
    image: "/images/review/Ashish Dwivedi.png",
    date: "4 days ago",
    short: "Excellent services, very helpful and humble. I recommend EazyVisas for all your visa needs!",
    full: "Excellent services, very helpful and humble. I recommend EazyVisas for all your visa needs! The team guided me through every step and made the process seamless.",
  },
  {
    name: "macsen jose",
    image: "/images/review/macsen jose.png",
    date: "16 days ago",
    short: "Had taken Shaheens assistance from EazyVisas and it was a smooth process. Highly recommended!",
    full: "Had taken Shaheens assistance from EazyVisas and it was a smooth process. Highly recommended! The support was prompt and professional.",
  },
  {
    name: "Aditya Bhardwaj",
    image: "/images/review/Aditya Bhardwaj.png",
    date: "2 weeks ago",
    short: "Very professional and prompt service. Got my visa without any hassle. Thank you!",
    full: "Very professional and prompt service. Got my visa without any hassle. Thank you! Will definitely use their services again.",
  },
  {
    name: "Mozammil Khan",
    image: "/images/review/Mozammil Khan.png",
    date: "1 week ago",
    short: "Great experience! The team was very supportive throughout the process.",
    full: "Great experience! The team was very supportive throughout the process. They answered all my queries and made sure everything was in order.",
  },
  {
    name: "Ramachandran",
    image: "/images/review/Ramachandran R S.png",
    date: "3 weeks ago",
    short: "Very helpful and efficient service. Highly recommend EazyVisas!",
    full: "Very helpful and efficient service. Highly recommend EazyVisas! The process was quick and easy.",
  },
  {
    name: "SHUBHAM JAIN",
    image: "/images/review/SHUBHAM JAIN.png",
    date: "2 weeks ago",
    short: "Quick response and very professional. Got my visa on time. Thank you!",
    full: "Quick response and very professional. Got my visa on time. Thank you! The staff was courteous and helpful.",
  },
  {
    name: "Siddhant Doshi",
    image: "/images/review/Siddhant Doshi.png",
    date: "1 month ago",
    short: "Amazing service and very friendly staff. Will use again for sure!",
    full: "Amazing service and very friendly staff. Will use again for sure! The process was smooth and transparent.",
  },
  {
    name: "Sonia Bhatti",
    image: "/images/review/Sonia Bhatti.png",
    date: "3 weeks ago",
    short: "Very satisfied with the service. Got my visa quickly and easily.",
    full: "Very satisfied with the service. Got my visa quickly and easily. Highly recommend their services.",
  },
  {
    name: "Vachan Kudmule",
    image: "/images/review/Vachan Kudmule.png",
    date: "2 weeks ago",
    short: "Superb experience! The process was smooth and transparent.",
    full: "Superb experience! The process was smooth and transparent. The team was always available for support.",
  },
  {
    name: "vinit mehta",
    image: "/images/review/vinit mehta.png",
    date: "1 month ago",
    short: "Very happy with the support and guidance. Highly recommend!",
    full: "Very happy with the support and guidance. Highly recommend! The team is knowledgeable and efficient.",
  },
];

const FeedbackReviewComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeReview, setActiveReview] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const container = document.getElementById('review-carousel');
    if (!container) return;

    let animationId;
    let lastTimestamp = 0;
    const scrollSpeed = 0.8; // Slightly faster for better visibility

    const autoScroll = (timestamp) => {
      if (isPaused) {
        animationId = requestAnimationFrame(autoScroll);
        return;
      }

      if (timestamp - lastTimestamp >= 16) { // ~60fps
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Check if we can actually scroll (has overflow content)
        if (maxScroll <= 0) {
          animationId = requestAnimationFrame(autoScroll);
          return;
        }
        
        if (container.scrollLeft >= maxScroll - 1) { // Small buffer to prevent stuck
          // Smooth reset to beginning with a small delay
          setTimeout(() => {
            if (container) {
              container.scrollLeft = 0;
            }
          }, 1000); // 1 second pause before reset
          // Pause briefly during reset
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 1500);
        } else {
          container.scrollLeft += scrollSpeed;
        }
        
        lastTimestamp = timestamp;
      }
      
      animationId = requestAnimationFrame(autoScroll);
    };

    // Fallback mechanism to prevent getting stuck
    const stuckCheckInterval = setInterval(() => {
      if (!isPaused && container) {
        const currentPosition = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If position hasn't changed and we're not at the beginning, reset
        if (currentPosition === lastScrollPosition && currentPosition > 0 && maxScroll > 0) {
          container.scrollLeft = 0;
          setLastScrollPosition(0);
        } else {
          setLastScrollPosition(currentPosition);
        }
      }
    }, 3000); // Check every 3 seconds

    // Start auto-scroll after a small delay to ensure container is ready
    const startTimeout = setTimeout(() => {
      animationId = requestAnimationFrame(autoScroll);
    }, 500);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (startTimeout) {
        clearTimeout(startTimeout);
      }
      if (stuckCheckInterval) {
        clearInterval(stuckCheckInterval);
      }
    };
  }, [isPaused, lastScrollPosition]);

  // ✅ Handle Star Selection
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setShowPopup(false);

    if (rating >= 4) {
      window.open(
        "https://www.google.com/search?q=EazyVisas+l+Dummy+Flight+Tickets,+End+to+End+Visa+Services+for+over+60+countries+Reviews#lrd=0x3be7c3d08973e3f3:0x4d579303c049e89c,3",
        "_blank"
      );
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
    <Layout>
      <section className="py-16">
        <div className="text-left">
          {/* ✅ Heading */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="inline-block mb-3 px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
                ✈️ Feedback
              </p>
              <h1 className="mt-4 text-3xl font-extrabold text-gray-800 mb-10">
                See What Our <br className="sm:hidden" />
                <span className="text-blue-500">Happy Clients</span> Say
              </h1>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="px-6 self-start text-sm py-[10px] bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Leave Review
            </button>
          </div>

          {/* Google Rating Summary */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-1">
              <FcGoogle size={32} className="mr-2" />
              <span className="text-2xl font-semibold text-gray-800">Excellent on Google</span>
            </div>
            <div className="text-lg font-medium text-gray-700">5.0 out of 5 based on 50 reviews</div>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
          </div>

          {/* Hardcoded Google Reviews - Carousel/Slider */}
          <div className="relative">
            {/* Left scroll button */}
            <button
              onClick={() => {
                setIsPaused(true);
                const container = document.getElementById('review-carousel');
                if (container) {
                  container.scrollBy({ left: -350, behavior: 'smooth' });
                  // Resume auto-scroll after manual scroll completes
                  setTimeout(() => setIsPaused(false), 1000);
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md text-blue-500 h-10 w-10 rounded-full hidden md:flex items-center justify-center z-10 hover:bg-blue-50 transition-colors"
              style={{marginLeft: '-20px'}}
            >
              <FaAngleLeft size={22} />
            </button>
            {/* Carousel container */}
            <div
              id="review-carousel"
              className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1 hide-scrollbar"
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch'}}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {reviews.map((review, idx) => (
                <div
                  key={review.name}
                  className="bg-white rounded-xl shadow-md p-4 flex-shrink-0 flex flex-col justify-between h-full hover:shadow-lg transition-shadow w-[220px] max-w-[90vw] min-h-[220px] md:min-h-[240px]"
                >
                  <div className="flex items-center mb-2 w-full">
                    <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div className="w-full">
                      <div className="font-semibold truncate w-full">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">★</span>
                    ))}
                  </div>
                  <div className="text-gray-700 text-sm mb-2 line-clamp-4">{review.short}</div>
                  <button
                    className="text-blue-500 text-xs font-medium mt-auto self-start underline hover:text-blue-700"
                    onClick={() => setActiveReview(idx)}
                  >
                    Read more
                  </button>
                </div>
              ))}
            </div>
            {/* Right scroll button */}
            <button
              onClick={() => {
                setIsPaused(true);
                const container = document.getElementById('review-carousel');
                if (container) {
                  container.scrollBy({ left: 350, behavior: 'smooth' });
                  // Resume auto-scroll after manual scroll completes
                  setTimeout(() => setIsPaused(false), 1000);
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md text-blue-500 h-10 w-10 rounded-full hidden md:flex items-center justify-center z-10 hover:bg-blue-50 transition-colors"
              style={{marginRight: '-20px'}}
            >
              <FaAngleRight size={22} />
            </button>
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
                      className={`text-3xl ${
                        star <= selectedRating ? "text-yellow-500" : "text-gray-400"
                      }`}
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
              transition={{ duration: 0.5 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <p className="text-white font-semibold">{notification.message}</p>
            </motion.div>
          )}

          {/* Review Popup */}
          {activeReview !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeIn">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={() => setActiveReview(null)}
                >
                  ×
                </button>
                <div className="flex items-center mb-2">
                  <img src={reviews[activeReview].image} alt={reviews[activeReview].name} className="w-12 h-12 rounded-full mr-3 object-cover" />
                  <div>
                    <div className="font-semibold text-lg">{reviews[activeReview].name}</div>
                    <div className="text-xs text-gray-500">{reviews[activeReview].date}</div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <div className="text-gray-800 text-base mt-4 whitespace-pre-line">{reviews[activeReview].full}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FeedbackReviewComponent;
