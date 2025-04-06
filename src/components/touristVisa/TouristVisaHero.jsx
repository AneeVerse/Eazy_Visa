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
import ConsultationForm from '../common/ConsultationForm';

const SCROLL_IMAGES = [
    '/images/home/hero1.png',
    '/images/home/hero2.png',
    '/images/home/hero3.png',
    '/images/home/hero4.png',
    '/images/home/hero2.png',
    '/images/home/hero3.png',
];

export default function TouristVisaHero({ title, image }) {
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
        <Layout className="relative mt-[80px] flex flex-col lg:flex-row justify-between items-center gap-12 pb-12">
            {/* left Content - Scrolling Images */}
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

            {/* right Content */}
            <div className="relative flex-1">
               <ConsultationForm />
            </div>

        </Layout>
    );
}