"use client";
import { motion } from 'framer-motion';
import Button from '../common/Button';
import FormComponent from '../common/FormComponent';

const AdsVisaHero = ({ onBookingClick }) => {
  const handleHeroCta = (type) => {
    if (onBookingClick) {
      onBookingClick({ type });
    }
  };

  return (
    <div className="min-h-screen flex items-start bg-gradient-to-r from-purple-100 to-blue-100 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[50px] py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-6 xl:gap-8 items-stretch mt-8 sm:mt-12 lg:mt-16">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between mt-4 sm:mt-8 lg:mt-8 space-y-6 lg:space-y-0 lg:col-span-3"
          >
            <div className="space-y-5 text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  {[
                    'Expert',
                    ' Visa',
                    ' Consultants',
                    ' for',
                    ' 100+',
                    ' Countries',
                  ].map((word, wordIndex) => (
                    <span key={wordIndex}>
                      {word.split('').map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex}-${charIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.08,
                            delay: (wordIndex * 4 + charIndex) * 0.06,
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.span>
              </h1>

              <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg text-gray-700 leading-relaxed">
                Get professional visa assistance for tourist, business, and documentation services. Our expert consultants guide you through the entire visa application process with verified flight itineraries and hotel bookings.
              </p>
              
              <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg text-gray-700 leading-relaxed">
                With 10+ years of experience, we offer fast processing, 24/7 WhatsApp support, and trusted service for destinations like UAE, Schengen, UK, USA, Canada, Singapore, Thailand, and Japan. No guarantees - just expert guidance every step of the way.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>WhatsApp Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fast Processing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>10+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-6 lg:mt-auto">
              <Button
                onClick={() => handleHeroCta('flight')}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Get Free Consultation
              </Button>
              <Button
                onClick={() => handleHeroCta('hotel')}
                className="flex-1 sm:flex-none bg-white text-blue-600 border-2 border-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                View Visa Services
              </Button>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full self-start lg:col-span-2"
          >
            <div className="w-full flex flex-col items-center lg:items-end">
              <div className="w-full max-w-md">
                <FormComponent />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdsVisaHero;

