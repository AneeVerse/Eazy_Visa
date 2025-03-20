import { motion } from 'framer-motion';

export default function TestimonialCard({ name, comment, date }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xl">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <p className="text-gray-700">
        {comment}
      </p>
    </motion.div>
  );
}