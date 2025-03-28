"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaSuitcase, FaPlane } from "react-icons/fa";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { IoIosArrowForward } from "react-icons/io";
import { Heading } from "../common/Typography";

export default function AboutUs() {
  return (
    <section className="py-20 ">
      <Layout className="flex flex-col md:flex-row items-start gap-12">
        {/* Left Content */}
        <div className="md:w-1/2  space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <div className="flex justify-between gap-2">
              <Heading level={2} weight={"bold"} className="text-secondary-500">
                About <span className="text-blue-600">US</span>
              </Heading>
           
            <Button variant="primary" icon={<IoIosArrowForward/>} size="medium" href="/about">
              Read More
            </Button>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Set your travel goals, optimize your itinerary, and explore Norway with ease. 
              Our smart technology helps you plan the perfect adventure, from fjord cruises to Northern Lights excursions.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <FaMapMarkerAlt className="text-2xl text-secondary-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Choose Your Destination</h3>
                <p className="text-gray-600">Select from thousands of beautiful places</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <FaSuitcase className="text-2xl text-secondary-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Personalize Your Trip</h3>
                <p className="text-gray-600">Get custom itineraries tailored to your preferences</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <FaPlane className="text-2xl text-secondary-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Travel Effortlessly</h3>
                <p className="text-gray-600">Book and explore Norway without hassle</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-6">
            
          <Button variant="secondary" size="medium" href="/contact">
          Get Started
            </Button>
          
          
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mx-auto mt-8 md:mt-0">
          <Image
            src="/images/home/about-img.png"
            alt="Norway Travel"
            width={600}
            height={500}
            className="w-full rounded-xl max-h-[500px] shadow-lg"
          />
        </div>
      </Layout>
    </section>
  );
}