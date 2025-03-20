'use client';

import { motion } from 'framer-motion';
import { FaSuitcaseRolling, FaPlaneDeparture, FaCreditCard } from 'react-icons/fa';

const services = [
  {
    icon: <FaSuitcaseRolling className="text-purple-600 text-4xl" />,
    title: 'End to end visa solutions',
    description: 'From flights, stays, to sights, just count on our complete products.'
  },
  {
    icon: <FaPlaneDeparture className="text-purple-600 text-4xl" />,
    title: 'Fast track',
    description: 'From flights, stays, to sights, just count on our complete products.'
  },
  {
    icon: <FaCreditCard className="text-purple-600 text-4xl" />,
    title: 'Secure Payment',
    description: 'From flights, stays, to sights, just count on our complete products.'
  }
];

export default function OneStopSolutions() {
  return (
    <section className="py-16 bg-gradient-to-r from-white to-blue-50 text-center">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        One Stop Solutions
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}