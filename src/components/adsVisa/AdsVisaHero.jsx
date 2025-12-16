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
                    'Need',
                    ' dummy',
                    ' flights',
                    ' or',
                    ' hotel',
                    ' reservation',
                    ' for',
                    ' your',
                    ' visa',
                    ' application?',
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
                There are some countries that require dummy flights and hotel reservations as a mandatory requirement while
                applying for Visa. However denial of visa application can lead to heavy cancellation costs of flight
                tickets and hotel reservations. But with Eazy Visas, we make this easy and simple for you.
              </p>
              
              <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg text-gray-700 leading-relaxed">
                Book legitimate and verifiable dummy flights and hotel reservations for your visa applications at a
                fraction of actual cost. You can make reservations for dummy flights & hotels to any destinations or countries
                instantly. These dummy flights and reservations are acceptable for visa application to any country.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-6 lg:mt-auto">
              <Button
                onClick={() => handleHeroCta('flight')}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Book Flight
              </Button>
              <Button
                onClick={() => handleHeroCta('hotel')}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Book Hotels
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

