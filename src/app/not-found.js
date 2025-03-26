// components/NotFound.js
import Link from 'next/link';
import { FiFrown, FiHome, FiCompass, FiMail } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="bg-white/80 backdrop-blur-lg rounded-full p-6 shadow-2xl shadow-blue-100 inline-block mb-8">
          <FiFrown className="text-blue-600 w-12 h-12" />
        </div>

        {/* Error Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02]">
              <FiHome className="w-5 h-5" />
              Go Home
           
          </Link>
          <Link href="/countries"  className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 hover:border-blue-300 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02]">
              <FiCompass className="w-5 h-5" />
              Country Explorer
            
          </Link>
        </div>

        {/* Contact Option */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Still can&apos;t find what you need?</p>
          <Link href="/contact"  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <FiMail className="mr-2 w-5 h-5" />
              Contact Support
            
          </Link>
        </div>
      </div>
    </div>
  );
}