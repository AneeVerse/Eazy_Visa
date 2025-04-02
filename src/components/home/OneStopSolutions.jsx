'use client';

import { motion } from 'framer-motion';
import { FaSuitcaseRolling, FaPlaneDeparture, FaCreditCard } from 'react-icons/fa';
import { Heading, Subheading } from '../common/Typography';
import Layout from '../common/Layout';
import Image from 'next/image';

const services = [
  {
    iconUrl: "/images/icon/bag.svg",
    title: 'End to end visa solutions',
    description: 'From flights, stays, to sights, just count on our complete products.'
  },
  {
    iconUrl: "/images/icon/book.svg",
    title: 'Fast track',
    description: 'From flights, stays, to sights, just count on our complete products.'
  },
  {
    iconUrl: "/images/icon/card.svg",
    title: 'Secure Payment',
    description: 'From flights, stays, to sights, just count on our complete products.'
  }
];

export default function OneStopSolutions() {
  return (
    <section className="py-16  text-center">
      <Layout>
        <Heading level={2} className="text-secondary-500 mb-10">
        One Stop Solutions
         </Heading>
    
      <div className="grid md:grid-cols-3 gap-[30px]">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            // style={{boxShadow: '0px 1px 20px rgba(220, 220, 220, 0.3)'}}
            className="bg-white myshadow p-[26px] rounded-2xl  text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className=" mb-[30px]">
              <Image src={service.iconUrl} alt={service.title} width={60} height={60} className="w-[60px] h-[60px]" />
            </div>
            <Heading level={4} className="text-secondary-500 mb-4">
       {service.title}
         </Heading>
            <p className="text-gray-600 max-w-[210px] text-md">{service.description}</p>
          </motion.div>
        ))}
      </div></Layout>
    </section>
  );
}