'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heading, Paragraph } from '@/components/common/Typography';
import { FaCompass } from "react-icons/fa";
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiSendPlaneFill } from "react-icons/ri";
import { IoAirplane } from 'react-icons/io5';
import Layout from '../common/Layout';

const SCROLL_IMAGES = [
  '/images/home/hero1.png',
  '/images/home/hero2.png',
  '/images/home/hero3.png',
  '/images/home/hero4.png',
  '/images/home/hero2.png',
  '/images/home/hero3.png',
];

export default function HeroSection() {
  const scrollContainerUpRef = useRef(null);
  const scrollContainerDownRef = useRef(null);

  // Function to handle smooth scroll
  const startScroll = (containerRef, direction = 'up') => {
    const scrollContainer = containerRef.current;
    let animationFrameId;
    let scrollPos = 0;
    const speed = 0.25; // Adjust scroll speed here

    const animateScroll = () => {
      if (!scrollContainer) return;

      // Update scroll position based on direction
      scrollPos += direction === 'up' ? -speed : speed;

      // Reset position when reaching boundaries
      if (scrollPos <= -scrollContainer.scrollHeight / 2) {
        scrollPos = 0;
      } else if (scrollPos >= scrollContainer.scrollHeight / 2) {
        scrollPos = 0;
      }

      // Apply smooth transform
      scrollContainer.style.transform = `translateY(${scrollPos}px)`;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    const cleanupUp = startScroll(scrollContainerUpRef, 'up'); // First column scrolls up
    const cleanupDown = startScroll(scrollContainerDownRef, 'down'); // Second column scrolls down

    return () => {
      cleanupUp();
      cleanupDown();
    };
  }, []);

  return (
    <Layout className="relative w-full mt-[120px] flex flex-col lg:flex-row items-center gap-12 pb-16">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full myshadow border border-gray-200">
            <span className="text-blue-600 font-semibold">Explore the world!</span>
            <FaCompass className="text-blue-600 text-xl" />
          </div>

          <Heading level={1} className="text-5xl uppercase md:text-6xl font-bold">
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
      <div className="lg:w-1/2 mt-[90px]  relative  w-full ">
        {/* Column 1 - Scroll Up */}
        <div className='w-full md:w-[424px] mx-auto relative flex h-[400px] md:h-[500px] gap-3 sm:gap-6 justify-center'>
          
        <FaMapMarkerAlt className="absolute bottom-0 right-1/3 bg-[#2fa6d9] p-2 rounded-full text-4xl text-white drop-shadow-lg" />
        <RiSendPlaneFill className="absolute -top-22 -rotate-90 right-1/3 bg-[#facd49] p-2 rounded-full text-4xl text-white drop-shadow-lg" />

        <div className="w-[200px] bg-transparent  mt-[30px] rounded-xl overflow-hidden relative">
          <div
            ref={scrollContainerUpRef}
            className="absolute h-[200%] w-full"
          >
            {[...SCROLL_IMAGES, ...SCROLL_IMAGES].map((src, index) => (
              <motion.div
                key={index}
                className="relative group w-full mb-3 sm:mb-6 "
              >
                <Image
                  src={src}
                  width={300}
                  height={400}
                  alt={`Destination ${index + 1}`}
                  className="rounded-2xl  object-cover h-[250px] w-full"
                  loading="lazy"
                />
              </motion.div>
            ))}

          </div>
        </div>

          <img 
            src="/images/home/svg/plain1.svg"
            alt="Decorative Airplane"
            className="absolute -top-16 -left-26  -z-10 "
          />
          <img 
            src="/images/home/svg/plain2.svg"
            alt="Decorative Airplane"
            className="absolute bottom-16 -right-36 hidden md:block  -z-10 "
          />
          

        {/* Column 2 - Scroll Down */}
        <div className="w-[200px] bg-transparent -mt-[30px] mb-[60px] rounded-xl overflow-hidden relative">
          <div
            ref={scrollContainerDownRef}
            className="absolute translate-y-[-160%] h-[200%] w-full"
          >
            {[...SCROLL_IMAGES, ...SCROLL_IMAGES].map((src, index) => (
              <motion.div
                key={index}
                className="relative group w-full mb-3 sm:mb-6 "
              >
                <Image
                  src={src}
                  width={300}
                  height={400}
                  alt={`Destination ${index + 1}`}
                  className="rounded-2xl object-cover h-[250px] w-full"
                  loading="lazy"
                />
                {/* <FaMapMarkerAlt className="absolute top-4 right-4 text-2xl text-yellow-400 drop-shadow-lg" /> */}
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Decorative Airplanes */}
      {/* <IoAirplane className="absolute top-20 -left-8 text-4xl text-purple-500 rotate-45 animate-float opacity-80 hidden lg:block" /> */}
      {/* <IoAirplane className="absolute bottom-20 -right-8 text-4xl text-green-500 -rotate-45 animate-float opacity-80 hidden lg:block" /> */}
    </Layout>
  );
}