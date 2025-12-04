'use client';

import { motion } from 'framer-motion';
import { FaSuitcaseRolling, FaPlaneDeparture, FaCreditCard } from 'react-icons/fa';
import { Heading, Subheading } from '../common/Typography';
import Layout from '../common/Layout';
import Image from 'next/image';

const services = [
  {
    iconUrl: "/images/icon/bag.svg",
    title: 'End to End visa solutions',
    description: 'From dummy flights booking to visa approval, we handle it all!'
  },
  {
    iconUrl: "/images/icon/book.svg",
    title: 'Fast track',
    description: 'Get your dummy flights and visa faster with our priority processing.'
  },
  {
    iconUrl: "/images/icon/card.svg",
    title: 'Secure Payment',
    description: 'Safe and hassle-free transactions for dummy flights bookings every time.'
  }
];

export default function OneStopSolutions() {
  return (
    <section className="pt-16 pb-6  text-center">
      <Layout>
        <Heading level={2} className="text-secondary-500 mb-10">
        One Stop Solutions
         </Heading>
    
      <div className="grid md:grid-cols-3 gap-[30px]">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            // style={{boxShadow: '0px 1px 20px rgba(220, 220, 220, 0.3)'}}
            className=" p-[26px] relative   text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
         {  index != 2 &&   <img src={"/images/icon/aeroplane.png"} alt={service.title} className="absolute top-[15px] hidden md:block opacity-80 left-[60%] lg:left-[60%] xl:left-[253px] w-auto h-[45px] lg:h-[55px] z-20" />}
            <div className=" relative mb-[30px]">
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