"use client";

import Image from "next/image";
import { Heading, Subheading } from "../common/Typography";
import Layout from "../common/Layout";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const states = [
  {
    number: 500,
    title: "visa approved",
    suffix: "+"
  },
  {
    number: 1000,
    title: "Happy Customers",
    suffix: "+"
  },
  {
    number: 5,
    title: "Years Of experience",
    suffix: "+"
  },
  {
    number: 150,
    title: "Countries Visa assistance",
    suffix: "+"
  },
];

const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const animateCount = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("travel-point-stats");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [target, duration]);

  return count;
};

export default function TravelPoint() {
  return (
    <section className="relative py-24">
      {/* <div className="absolute blur-[0px] top-[50%] -translate-y-[50%] -left-[0px] -z-10 w-full h-full bg-gradient-to-bl from-[#F6E5C1] via-[#F3F3EC] to-[#F3F3EC]"></div>
      <div className="absolute blur-[0px] top-[50%] -translate-y-[50%] -left-[0px] -z-10 w-full h-full bg-gradient-to-br from-[#F6E5C1] via-transparent to-transparent"></div>
      <div className="absolute blur-[0px] top-[50%] -translate-y-[50%] -left-[0px] -z-10 w-full h-full bg-gradient-to-r from-transparent via-[#F3F3EC] to-transparent"></div> */}
      
      <Layout className="flex flex-col md:flex-row gap-10">
        {/* Left Image - Sticky Container */}
        <div className="md:w-1/2 flex justify-center md:justify-start md:items-start relative">
          <div className="sticky top-10 h-fit max-w-[70%] sm:max-w-[80%]">
            {/* Base Image */}
            <div className="px-5 sm:px-7 pt-5 sm:pt-7 max-w-[400px] shadow-md pb-16 sm:pb-20 bg-white">
              <Image
                src="/images/home/discover-2.jpg"
                alt="Norway Travel"
                width={400}
                height={500}
                className="w-full h-auto"
              />
            </div>
            
            {/* Rotating Image */}
            <motion.div
              initial={{ rotate: 10 }}
              animate={{ rotate: [10, 15, 10] }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              style={{
                transformOrigin: 'center bottom',
              }}
              className="px-5 sm:px-7 pt-5 sm:pt-7 max-w-[400px]  absolute top-2 pb-16 sm:pb-20 shadow-md bg-white"
            >
              <Image
                src="/images/home/discover-1.jpg"
                alt="Norway Travel"
                width={400}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2  space-y-6 text-white">
          {/* <Subheading className="text-primary-500 mb-2 uppercase tracking-widest">
            Travel Point
          </Subheading> */}
          <Heading level={2} className="text-secondary-500 mb-10 uppercase">
          Stress Free Visa,<span className="text-blue-500"> Every Time.</span> 
          </Heading>

          <p className="text-[#7e7e7e]">
          Getting your visa just got easier! Count on us for quick processing, expert help, and friendly support every step of the way. </p>

          {/* Stats Grid */}
          <div id="travel-point-stats" className="grid grid-cols-2 gap-4 sm:gap-6">
            {states.map((state, index) => {
              const count = useCountUp(state.number);
              return (
                <div
                  key={index}
                  className=" flex flex-col gap-3"
                >
                  <h3 className="text-2xl sm:text-[45px] md:text-[45px] lg:text-[60px] xl:text-[70px] text-[#222222] font-bold">
                    {count.toLocaleString()}{state.suffix}
                  </h3>
                  <div className="h-[1px] w-full bg-gray-300" />
                  <p className="text-md text-left font-semibold sm:text-lg md:text-xl text-[#222222]">
                    {state.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </section>
  );
}