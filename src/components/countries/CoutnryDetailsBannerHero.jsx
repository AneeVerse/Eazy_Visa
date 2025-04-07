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

export default function CoutnryDetailsBannerHero({ title, image }) {
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
        <div className="relative overflow-x-hidden w-full mt-[40px]  lg:mt-[80px] flex flex-col lg:flex-row items-center gap-12 pb-16">

      <div className="absolute blur-[200px] top-[0%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>

<div className="absolute blur-[200px] -z-10 rounded-full top-[20%] -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>
            {/* Left Content */}
            <div className="lg:w-2/3 relative">
                <div className="relative">
                    <img
                        src={image}
                        alt={title}
                        className='w-full h-[500px] rounded-xl object-cover'
                    />
                    <div className="absolute rounded-xl  inset-0 bg-black/20"></div>
                    {/* text overlay at top */}
                    <div className="absolute top-0 left-0 right-0 p-6 rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <IoAirplane className="text-white  rounded-full p-1 border border-white text-xl -rotate-[60deg]" />
                            <Heading level={5} weight="bold" className="text-white">
                                {title} Visa
                            </Heading>
                        </div>

                    </div>


                    {/* Text Overlay at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                        <h2 className="text-3xl font-bold text-white">Explore Beautiful Destinations</h2>
                        <p className="text-white/80 mt-2">Discover the most amazing places to visit in this country</p>
                    </div>
                </div>
            </div>

            {/* Right Content - Scrolling Images */}
            <div className="lg:w-1/2 relative w-full">
                {/* Column Container */}
                <div className='w-full md:w-[424px] mx-auto relative flex h-[400px] md:h-[500px] gap-3 sm:gap-6 justify-center'>
                    {/* Column 1 - Scroll Up */}
                    <div className="w-[200px] bg-transparent mt-[30px] rounded-xl overflow-hidden relative">
                        <div
                            ref={scrollContainerUpRef}
                            className="absolute h-[200%] w-full"
                        >
                            {[...SCROLL_IMAGES, ...SCROLL_IMAGES].map((src, index) => (
                                <motion.div
                                    key={index}
                                    className="relative group w-full mb-3 sm:mb-6"
                                >
                                    <Image
                                        src={src}
                                        width={300}
                                        height={400}
                                        alt={`Destination ${index + 1}`}
                                        className="rounded-2xl object-cover h-[250px] w-full"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Scroll Down */}
                    <div className="w-[200px] bg-transparent -mt-[30px] mb-[60px] rounded-xl overflow-hidden relative">
                        <div
                            ref={scrollContainerDownRef}
                            className="absolute translate-y-[-160%] h-[200%] w-full"
                        >
                            {[...SCROLL_IMAGES, ...SCROLL_IMAGES].map((src, index) => (
                                <motion.div
                                    key={index}
                                    className="relative group w-full mb-3 sm:mb-6"
                                >
                                    <Image
                                        src={src}
                                        width={300}
                                        height={400}
                                        alt={`Destination ${index + 1}`}
                                        className="rounded-2xl object-cover h-[250px] w-full"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}