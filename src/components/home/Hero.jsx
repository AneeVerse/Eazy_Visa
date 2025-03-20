'use client';
import { motion } from 'framer-motion';
import { Heading, Paragraph } from '@/components/common/Typography';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoAirplane } from 'react-icons/io5';

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 py-16 lg:py-24">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-block bg-white shadow-md px-4 py-2 rounded-full mb-4">
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Explore the world! <IoAirplane className="text-xl" />
            </span>
          </div>
          <Heading level={1} className="text-black">
            STRESS FREE VISA, <span className="text-blue-600">EVERY TIME.</span>
          </Heading>
          <Paragraph className="mt-4 text-gray-600">
            Plan and book your perfect trip with expert advice, travel tips, destination information, and inspiration from us!
          </Paragraph>
          <motion.button whileHover={{ scale: 1.05 }} className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg">
            Get Started
          </motion.button>
        </motion.div>
      </div>
      
      {/* Right Content (Images & Icons) */}
      <div className="lg:w-1/2 flex flex-wrap gap-4 justify-center lg:justify-end mt-10 lg:mt-0 relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className=" columns-2  gap-4 space-y-4">
            <div className="relative mt-[40px]">
              <Image src="/images/home/hero2.png" width={150} height={150} alt="Destination 1" className="rounded-xl shadow-lg" />
              <FaMapMarkerAlt className="absolute -top-3 -left-3 text-yellow-500 text-xl" />
            </div>
            <div>
              <Image src="/images/home/hero3.png" width={150} height={150} alt="Destination 2" className="rounded-xl shadow-lg" />
            </div>
            <div>
              <Image src="/images/home/hero4.png" width={150} height={150} alt="Destination 3" className="rounded-xl shadow-lg" />
            </div>
            <div className="relative">
              <Image src="/images/home/hero1.png" width={150} height={150} alt="Destination 4" className="rounded-xl shadow-lg" />
              <FaMapMarkerAlt className="absolute -bottom-3 -right-3 text-blue-500 text-xl" />
            </div>
          </div>
        </motion.div>
        
        {/* Airplane Paths */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <IoAirplane className="absolute top-8 right-12 text-purple-500 text-3xl rotate-45 animate-pulse" />
          <IoAirplane className="absolute bottom-8 left-8 text-purple-500 text-3xl -rotate-45 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
