"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoMdChatboxes } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import FormComponent from '../common/FormComponent';

const adsLandingPaths = ['/ads-visa', '/Vietnam-touristvisa', '/bali-touristvisa', '/ads-schengen'];

const FloatingActionButton = () => {
  const pathname = usePathname();
  const isAdsLandingPage = adsLandingPaths.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  );
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const getSource = () => {
    if (!pathname || pathname === '/') return 'home contact widget';
    if (pathname === '/contact') return 'contact widget of contact page';

    const pathLabel = pathname
      .split('/')
      .filter(Boolean)
      .join(' ')
      .replace(/-/g, ' ');

    return `${pathLabel} contact widget`;
  };

  const handleContactClick = () => {
    setShowForm(true);
    setOpen(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, rotate: 360 },
    tap: { scale: 0.95 }
  };

  return (
    <div className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 ${showForm ? 'z-[80]' : 'z-40'}`}>
      {!open && !showForm && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center gap-3 mb-4"
        >
          <motion.button
            onClick={handleContactClick}
            className="w-14 h-14 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp size={26} />
          </motion.button>

          <motion.button
            onClick={handleContactClick}
            className="w-14 h-14 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope size={26} />
          </motion.button>

          <motion.button
            onClick={handleContactClick}
            className="w-14 h-14 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPhone size={26} />
          </motion.button>
        </motion.div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeForm}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <FormComponent
              onClose={closeForm}
              from={isAdsLandingPage ? undefined : getSource()}
            />
          </div>
        </div>
      )}

      <motion.button
        className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <div>
          {open ? (
            <IoMdChatboxes className="self-center h-8 w-8" />
          ) : (
            <IoClose className='self-center h-7 w-7' />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
