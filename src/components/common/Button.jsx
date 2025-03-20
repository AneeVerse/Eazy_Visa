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
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  // Size Styles
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
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
  const buttonStyles = `flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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