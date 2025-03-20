"use client";

import Image from "next/image";

export default function TravelPoint() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-200 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Image */}
        <div className="relative md:w-1/2">
          <div className="relative z-10">
            <Image
              src="/images/home/asian-woman.png"
              alt="Traveler"
              width={500}
              height={500}
              className="rounded-xl"
            />
          </div>
          {/* Background Circle Design */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute top-16 right-5 w-5 h-5 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-24 right-10 w-3 h-3 bg-purple-400 rounded-full opacity-70"></div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 space-y-6 text-white">
          <h3 className="text-lg uppercase font-semibold tracking-wide text-blue-100">
            Travel Point
          </h3>
          <h2 className="text-4xl font-bold leading-tight text-white">
            We help you find your dream destination
          </h2>
          <p className="text-blue-100">
            Hey! Travelo there to help you find your dream holiday. Easy, you just find where 
            you want to go and buy the ticket.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white text-blue-900 px-6 py-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">200+</h3>
              <p className="text-sm">Holiday Package</p>
            </div>
            <div className="bg-white text-blue-900 px-6 py-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">450</h3>
              <p className="text-sm">RedDoorz</p>
            </div>
            <div className="bg-white text-blue-900 px-6 py-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">10</h3>
              <p className="text-sm">Premium Airlines</p>
            </div>
            <div className="bg-white text-blue-900 px-6 py-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">12k+</h3>
              <p className="text-sm">Happy Customer</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
