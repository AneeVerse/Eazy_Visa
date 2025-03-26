import Image from 'next/image';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function TeamMember({ name, role, bio, imgSrc }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg shadow-indigo-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative h-64 bg-indigo-100">
        {imgSrc && (
          <Image 
            src={imgSrc}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="filter grayscale(20%)"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-indigo-600 mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-indigo-600">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-indigo-600">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}