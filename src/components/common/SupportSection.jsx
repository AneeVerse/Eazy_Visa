import Link from 'next/link';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const SupportSection = ({ 
  title = "Need help choosing?",
  description = "Our visa specialists are available to help you select the perfect plan for your needs.",
  className = "mt-20 text-center"
}) => {
  return (
    <div className={className}>
      <div className="inline-block bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-8 shadow-sm max-w-4xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="https://wa.me/918850146905"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 h-[52px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaWhatsapp className="mr-2 text-xl" />
            Chat with us
          </Link>
          <Link 
            href="tel:+918850146905" 
            className="inline-flex items-center justify-center px-6 h-[52px] bg-white text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaPhoneAlt className="mr-2" /> Call Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupportSection; 