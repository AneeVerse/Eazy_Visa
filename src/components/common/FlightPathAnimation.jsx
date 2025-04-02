"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FlightPathAnimation = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Plane position animation - fixed percentages
  const planeX = useTransform(scrollYProgress, [0, 1], ["-0%", "-3000%"]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[40px] w-full overflow-hidden"
    >
      {/* Static dotted path line */}
      <div 
        className="absolute h-[2px] w-full top-1/2 left-0 border-b-2 border-dashed border-gray-200"
        style={{ borderSpacing: "10px" }}
      />

      {/* Map icon at left end */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>

      {/* Animated plane */}
      <motion.div
        style={{
          x: planeX,
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
      >
        <img 
          src="/images/icon/flight.svg" 
          alt="Plane" 
          className="w-[40px] h-[40px] opacity-30" 
        />
      </motion.div>
    </div>
  );
};

export default FlightPathAnimation;