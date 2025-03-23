'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heading, Paragraph } from '@/components/common/Typography';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoAirplane } from 'react-icons/io5';

const SCROLL_IMAGES = [
  '/images/home/hero1.png',
  '/images/home/hero2.png',
  '/images/home/hero3.png',
  '/images/home/hero4.png',
  '/images/home/hero5.png',
  '/images/home/hero6.png',
  // Add up to 10 images as needed
];

export default function HeroSection() {
  const scrollContainerUpRef = useRef(null);
  const scrollContainerDownRef = useRef(null);

  // Function to handle smooth scroll
  const startScroll = (containerRef, direction = 'up', speed = 0.5) => {
    const scrollContainer = containerRef.current;
    let animationFrameId;

    const animateScroll = () => {
      if (scrollContainer) {
        if (direction === 'up') {
          scrollContainer.scrollTop -= speed;
          if (scrollContainer.scrollTop <= 0) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight / 2;
          }
        } else {
          scrollContainer.scrollTop += speed;
          if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
            scrollContainer.scrollTop = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animateScroll();
    return () => cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    const cleanupUp = startScroll(scrollContainerUpRef, 'up', 0.5);
    const cleanupDown = startScroll(scrollContainerDownRef, 'down', 0.5);

    return () => {
      cleanupUp();
      cleanupDown();
    };
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 py-16 lg:py-24 gap-12">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <IoAirplane className="text-blue-600 text-xl animate-bounce" />
            <span className="text-blue-600 font-semibold">Explore the world!</span>
          </div>

          <Heading level={1} className="text-5xl md:text-6xl font-bold">
            Stress Free Visa, <br />
            <span className="text-blue-600">Every Time.</span>
          </Heading>

          <Paragraph className="text-lg text-gray-600 max-w-2xl">
            Plan and book your perfect trip with expert advice, travel tips, destination information, 
            and inspiration from us!
          </Paragraph>

          <div className="flex gap-4 justify-center lg:justify-start">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full 
              font-semibold transition-all shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Content - Scrolling Images */}
      <div className="lg:w-1/2 w-full flex gap-6">
        {/* Column 1 - Scroll Up */}
        <div 
          ref={scrollContainerUpRef}
          className="w-1/2 h-[600px] overflow-hidden scrollbar-hidden"
        >
          <div className="flex flex-col gap-6">
            {[...SCROLL_IMAGES, ...SCROLL_IMAGES].map((src, index) => (
              <motion.div 
                key={index}
                className="relative group w-full hover:scale-105 transition-transform"
              >
                <Image
                  src={src}
                  width={300}
                  height={400}
                  alt={`Destination ${index + 1}`}
                  className="rounded-2xl shadow-xl object-cover h-[250px] w-full"
                />
                <FaMapMarkerAlt className="absolute top-4 right-4 text-2xl text-yellow-400 
                  drop-shadow-lg animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Column 2 - Scroll Down */}
        <div 
          ref={scrollContainerDownRef}
          className="w-1/2 h-[600px] overflow-hidden scrollbar-hidden"
        >
          <div className="flex flex-col gap-6">
            {[...SCROLL_IMAGES, ...SCROLL_IMAGES].map((src, index) => (
              <motion.div 
                key={index}
                className="relative group w-full hover:scale-105 transition-transform"
              >
                <Image
                  src={src}
                  width={300}
                  height={400}
                  alt={`Destination ${index + 1}`}
                  className="rounded-2xl shadow-xl object-cover h-[250px] w-full"
                />
                <FaMapMarkerAlt className="absolute top-4 right-4 text-2xl text-yellow-400 
                  drop-shadow-lg animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Airplanes */}
      <IoAirplane className="absolute top-20 -left-8 text-4xl text-purple-500 rotate-45 
        animate-float opacity-80 hidden lg:block" />
      <IoAirplane className="absolute bottom-20 -right-8 text-4xl text-green-500 -rotate-45 
        animate-float-delayed opacity-80 hidden lg:block" />
    </section>
  );
}