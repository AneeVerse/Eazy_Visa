"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../common/Button';

const bookingImage = '/images/ads-right-hero.webp';

const HeroBookingSection = ({ onBookingClick }) => {
  const handleHeroCta = (type) => {
    if (onBookingClick) {
      onBookingClick({ type });
    }
  };

  return (
    <div className="min-h-screen flex items-start bg-gradient-to-r from-purple-100 to-blue-100 relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[50px] py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-8 items-start">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 lg:col-span-3 mt-4 sm:mt-8 lg:mt-8 order-2 lg:order-1"
          >
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  {[
                    'Need',
                    ' a',
                    ' flight',
                    ' ticket',
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

              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                There are some countries that have flight & hotel reservations as a mandatory requirement while
                applying for Visa. However denial of visa application can lead to heavy cancellation costs of flight
                tickets and hotel reservations. But with Eazy Visas, we make this easy and simple for you.
                <br />
                <br />
                Book legitimate and verifiable flight tickets and hotel reservations for your visa applications at a
                fraction of actual cost. You can make reservations for flight & hotel to any destinations or countries
                instantly. These reservations are acceptable for visa application to any country.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => handleHeroCta('flight')}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Book Flight
              </Button>
              <Button
                onClick={() => handleHeroCta('hotel')}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
              >
                Book Hotels
              </Button>
            </div>
          </motion.div>

          {/* Right Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 w-full self-start order-1 lg:order-2"
          >
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white/70 backdrop-blur">
                <Image
                  src={bookingImage}
                  alt="Visa assistance bookings"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 800px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">


                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBookingSection;