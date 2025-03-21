'use client';

import { motion } from 'framer-motion';
import { FaSuitcaseRolling, FaPlaneDeparture, FaCreditCard } from 'react-icons/fa';
import { Heading, Subheading } from '../common/Typography';
import Layout from '../common/Layout';

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
      <Layout>
        <Heading level={2} className="text-secondary-500 mb-10">
        One Stop Solutions
         </Heading>
    
      <div className="grid md:grid-cols-3 gap-[30px]">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-[26px] rounded-2xl shadow-lg text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 p-4 rounded-full mb-[30px]">
              {service.icon}
            </div>
            <Heading level={5} className="text-secondary-500 mb-4">
       {service.title}
         </Heading>
            <p className="text-gray-600 max-w-[210px] text-md">{service.description}</p>
          </motion.div>
        ))}
      </div></Layout>
    </section>
  );
}