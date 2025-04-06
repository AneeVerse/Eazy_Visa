// components/StatsBar.tsx
'use client';
import { useEffect, useRef } from 'react';
import { FaThumbsUp, FaShieldAlt, FaCheckCircle, FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: <FaThumbsUp className="text-yellow-400 text-xl" />,
    text: '15+ Years of expertise',
  },
  {
    icon: <FaShieldAlt className="text-yellow-400 text-xl" />,
    text: '1 Million+ visa processed',
  },
  {
    icon: <FaCheckCircle className="text-yellow-400 text-xl" />,
    text: '95% Visa success rate',
  },
  {
    icon: (
      <div className="flex items-center space-x-1">
        <FcGoogle className="text-xl" />
        <span className="text-yellow-400">⭐</span>
      </div>
    ),
    text: '4.0 Rating',
  },
];

export default function StatsBar() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && window.innerWidth < 768) {
      const scroll = () => {
        el.scrollTo({
          left: el.scrollLeft + 1,
          behavior: 'smooth',
        });
      };
      const interval = setInterval(scroll, 0);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="w-full bg-[#0e2f50] py-[10px] mb-8 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex md:justify-around items-center gap-10 px-4 md:px-10 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 min-w-max text-white text-sm md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {stat.icon}
            <span>{stat.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
