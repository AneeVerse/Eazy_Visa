"use client"
import { motion } from 'framer-motion';

// Heading Component
export const Heading = ({ level = 1, weight = "semibold", children, className, animate = false }) => {
  const Tag = `h${level}`;
  const sizes = {
    1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
    2: `text-3xl md:text-4xl font-${weight}`,
    3: `text-2xl md:text-3xl font-${weight}`,
    4: `text-xl md:text-2xl font-${weight}`,
    5: `text-lg md:text-xl font-${weight}`,
    6: `text-base md:text-lg font-${weight}`,
  };
  const animationProps = animate
    ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
    }
    : {};

  return (
    <motion.div {...animationProps}>
      <Tag className={`${sizes[level]} ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
};

// Subheading Component
export const Subheading = ({ children, className, animate = false }) => {
  const animationProps = animate
    ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: 0.2 },
    }
    : {};

  return (
    <motion.div {...animationProps}>
      <h2 className={`text-xl md:text-2xl font-semibold  ${className}`}>
        {children}
      </h2>
    </motion.div>
  );
};

// Paragraph Component
export const Paragraph = ({ children, className, animate = false }) => {
  const animationProps = animate
    ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: 0.4 },
    }
    : {};

  return (
    <motion.div {...animationProps}>
      <p className={`text-base md:text-lg text-gray-600 leading-relaxed ${className}`}>
        {children}
      </p>
    </motion.div>
  );
};

// Caption Component
export const Caption = ({ children, className, animate = false }) => {
  const animationProps = animate
    ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: 0.6 },
    }
    : {};

  return (
    <motion.div {...animationProps}>
      <span className={`text-sm text-gray-500 ${className}`}>
        {children}
      </span>
    </motion.div>
  );
};

// Label Component
export const Label = ({ children, className, animate = false }) => {
  const animationProps = animate
    ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: 0.8 },
    }
    : {};

  return (
    <motion.div {...animationProps}>
      <label className={`text-sm font-medium text-gray-700 ${className}`}>
        {children}
      </label>
    </motion.div>
  );
};