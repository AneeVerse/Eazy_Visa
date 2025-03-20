"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaSuitcase, FaPlane } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="py-16 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">About <span className="text-blue-600">US</span></h2>
          <p className="text-gray-600">
            Set your travel goals, optimize your itinerary, and explore Norway with ease. 
            Our smart technology helps you plan the perfect adventure, from fjord cruises to Northern Lights excursions.
          </p>

          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <FaMapMarkerAlt className="text-xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Choose Your Destination</h3>
                <p className="text-gray-600 text-sm">Select from thousands of beautiful places</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <FaSuitcase className="text-xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Personalize Your Trip</h3>
                <p className="text-gray-600 text-sm">Get custom itineraries tailored to your preferences</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <FaPlane className="text-xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Travel Effortlessly</h3>
                <p className="text-gray-600 text-sm">Book and explore Norway without hassle</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="text-blue-600 font-semibold flex items-center space-x-2 hover:underline">
              <span>Read More</span> <span className="ml-1">→</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <Image
            src="/images/home/about-img.png"
            alt="Norway Travel"
            width={500}
            height={400}
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
