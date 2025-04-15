"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaSuitcase, FaPlane } from "react-icons/fa";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { IoIosArrowForward } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { Heading } from "../common/Typography";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdFlashOn } from "react-icons/md";

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
            We simplify visa documentation with verified flight itineraries, hotel bookings, and foolproof itineraries—saving you time, money, and stress. No need for risky confirmed tickets; embassies accept our 100% genuine documents for smooth approvals. Trusted by travelers, approved by embassies.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <BiWorld className="text-2xl text-secondary-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Global Visa access</h3>
                <p className="text-gray-600">Search and apply for visas to 100+ countries all in one place.</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <MdFlashOn className="text-2xl text-secondary-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Fast and Simple Process</h3>
                <p className="text-gray-600">Get personalized visa info in seconds with an easy, guided search.</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white rounded-full shadow-md">
                <HiOutlineDocumentSearch className="text-2xl text-secondary-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Relaible & Updated Info</h3>
                <p className="text-gray-600">Stay ahead with the latest visa requirements, trusted by  travelers worldwide.</p>
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