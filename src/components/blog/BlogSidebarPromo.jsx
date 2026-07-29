import React from 'react';
import Link from 'next/link';

export default function BlogSidebarPromo() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl flex flex-col group">
      {/* Top Image - Gorgeous Airplane Travel Visual */}
      <div className="relative w-full h-36 overflow-hidden bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"
          alt="Visa Itinerary & Flight Bookings"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
          Instant Visa Itineraries & Bookings
        </h3>
        <p className="text-gray-600 text-[11px] mb-3 leading-tight">
          Get verified flight, hotel, and daywise itineraries delivered in 24 hours starting at ₹999.
        </p>

        {/* CTA Button */}
        <Link
          href="/visa-itinerary"
          className="w-full text-center py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium text-xs transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5 group/btn no-underline"
        >
          <span>See Pricing</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
