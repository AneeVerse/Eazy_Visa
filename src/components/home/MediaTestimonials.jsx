"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MediaTestimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected media index
  const scrollContainerRef = useRef(null); // Ref for the carousel container
  const mediaContainerRef = useRef(null); // Ref for the popup media container

  const testimonials = [
    { id: 1, type: "video", mediaUrl: "/videos/vid1.mp4", description: "Client Testimonial 1" },
    { id: 2, type: "video", mediaUrl: "/videos/vid2.mov", description: "Client Testimonial 2" },
    { id: 5, type: "image", mediaUrl: "/images/testimonials/3.png", description: "Client Review 1" },
    { id: 8, type: "image", mediaUrl: "/images/testimonials/6.png", description: "Client Review 2" },
    { id: 6, type: "image", mediaUrl: "/images/testimonials/2.png", description: "Client Review 3" },
    { id: 3, type: "image", mediaUrl: "/images/testimonials/1.png", description: "Client Review 4" },
    { id: 4, type: "image", mediaUrl: "/images/testimonials/4.png", description: "Client Review 5" },
    { id: 7, type: "image", mediaUrl: "/images/testimonials/5.png", description: "Client Review 6" },
    { id: 9, type: "image", mediaUrl: "/images/testimonials/7.png", description: "Client Review 7" },
    { id: 10, type: "image", mediaUrl: "/images/testimonials/client-with-certificate.jpg", description: "Client Review 8" },
    {
      id: 11,
      type: "image",
      mediaUrl: "/images/testimonials/client-1.jpg",
      description: "Client Review 9"
    },
    {
      id: 12,
      type: "image",
      mediaUrl: "/images/testimonials/client-2.jpg",
      description: "Client Review 10"
    },
    {
      id: 13,
      type: "image",
      mediaUrl: "/images/testimonials/client-3.jpg",
      description: "Client Review 11"
    },
    {
      id: 14,
      type: "image",
      mediaUrl: "/images/testimonials/client-4.jpg",
      description: "Client Review 12"
    },
    {
      id: 15,
      type: "image",
      mediaUrl: "/images/testimonials/client-5.jpg",
      description: "Client Review 13"
    },
    {
      id: 16,
      type: "image",
      mediaUrl: "/images/testimonials/client-6.jpg",
      description: "Client Review 14"
    },
    {
      id: 17,
      type: "image",
      mediaUrl: "/images/testimonials/client-7.jpg",
      description: "Client Review 15"
    },
    {
      id: 18,
      type: "image",
      mediaUrl: "/images/testimonials/client-8.jpg",
      description: "Client Review 16"
    },
  
  ];

  // Reset scroll position when media changes
  useEffect(() => {
    if (mediaContainerRef.current && selectedIndex !== null) {
      mediaContainerRef.current.scrollTo(0, 0);
    }
  }, [selectedIndex]);

  // Handle carousel scroll
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDistance = 300;
      const step = 10;
      let remainingDistance = scrollDistance;

      const scrollStep = () => {
        if (remainingDistance <= 0) return;
        const stepDistance = Math.min(step, remainingDistance);
        container.scrollLeft += direction === "left" ? -stepDistance : stepDistance;
        remainingDistance -= stepDistance;
        requestAnimationFrame(scrollStep);
      };
      scrollStep();
    }
  };

  return (
    <section className="relative pb-16">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleLeft size={20} className="text-white self-center" />
          </button>

          {/* Carousel container */}
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            className="relative flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="relative min-w-[220px] sm:min-w-[220px] h-[340px] hover:shadow-md rounded-lg overflow-hidden shadow-md transition-transform cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                {testimonial.type === "video" ? (
                  <video
                    src={testimonial.mediaUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  ></video>
                ) : (
                  <img
                    src={testimonial.mediaUrl}
                    alt={testimonial.description}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleRight size={20} className="text-white self-center" />
          </button>
        </div>
      </div>

      {/* Popup for selected media */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white z-50 bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedIndex(null)}
            >
              <IoClose className="w-6 h-6" />
            </button>

            {/* Left navigation button */}
            <button
              onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
              disabled={selectedIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleLeft size={20} />
            </button>

            {/* Right navigation button */}
            <button
              onClick={() => setSelectedIndex((prev) => Math.min(prev + 1, testimonials.length - 1))}
              disabled={selectedIndex === testimonials.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleRight size={20} />
            </button>

            {/* Media container */}
            <div
              ref={mediaContainerRef}
              className="relative max-w-3xl rounded-xl w-full h-full max-h-[90vh]"
            >
              {testimonials[selectedIndex].type === "video" ? (
                <video
                  src={testimonials[selectedIndex].mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-full rounded-xl object-contain"
                />
              ) : (
                <img
                  src={testimonials[selectedIndex].mediaUrl}
                  alt={testimonials[selectedIndex].description}
                  className="w-full h-full max-w-fit rounded-xl mx-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaTestimonials;