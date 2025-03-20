import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function DestinationCard({ location, rating, image }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="rounded-xl overflow-hidden shadow-lg"
    >
      <img src={image} alt={location} className="w-full h-48 object-cover" />
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{location}</h3>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}