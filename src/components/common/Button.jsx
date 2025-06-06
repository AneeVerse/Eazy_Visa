import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiLoader } from 'react-icons/fi';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  icon,
  iconPosition = 'right',
  onClick,
  loading = false,
  disabled = false,
  className = '',
  animate = false,
  target = '_self',
}) {
  // Variant Styles
  const variantStyles = {
    primary: ' cursor-pointer bg-[#6FBCFD]/40 text-primary-500 hover:bg-blue-500 hover:text-white',
    secondary: ' cursor-pointer bg-primary-500 text-white hover:bg-blue-600',
    outline: ' cursor-pointer border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: ' cursor-pointer text-blue-600 hover:bg-blue-50',
    danger: ' cursor-pointer bg-red-600 text-white hover:bg-red-700',
  };

  // Size Styles
  const sizeStyles = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-7 py-3 text-md',
    large: 'px-8 py-4 text-lg',
  };

  // Icon Size
  const iconSize = {
    small: 16,
    medium: 20,
    large: 24,
  };

  // Animation Props
  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.3 },
      }
    : {};

  // Button Content
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">
          {loading ? <FiLoader className="animate-spin" size={iconSize[size]} /> : icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">
          {loading ? <FiLoader className="animate-spin" size={iconSize[size]} /> : icon}
        </span>
      )}
    </>
  );

  // Common Button Styles
  const buttonStyles = `flex items-center min-w-fit  whitespace-nowrap justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
    variantStyles[variant]
  } ${sizeStyles[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  // Render as Link if href is provided
  if (href) {
    return (
      <motion.div {...animationProps}>
        <Link
          href={href}
          className={buttonStyles}
          target={target}
          onClick={onClick}
          aria-disabled={disabled || loading}
        >
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  // Render as Button
  return (
    <motion.div {...animationProps}>
      <button
        className={buttonStyles}
        onClick={onClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
      >
        {buttonContent}
      </button>
    </motion.div>
  );
}