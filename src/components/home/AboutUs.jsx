"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaSuitcase, FaPlane, FaCheckCircle, FaShieldAlt, FaHeadset } from "react-icons/fa";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { IoIosArrowForward } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { Heading } from "../common/Typography";
import { HiOutlineDocumentSearch, HiDocumentText } from "react-icons/hi";
import { MdFlashOn, MdSecurity, MdSpeed, MdPayment } from "react-icons/md";
import { BsCalendarCheck, BsFileEarmarkCheck } from "react-icons/bs";

export default function AboutUs() {
  return (
    <section className="py-20 ">
      <Layout className="flex flex-col md:flex-row items-start gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <div className="flex justify-between gap-2">
              <Heading level={2} weight={"bold"} className="text-secondary-500">
                Why <span className="text-blue-600">Eazy Visas</span>
              </Heading>

              <Button variant="primary" icon={<IoIosArrowForward />} size="medium" href="/about">
                Read More
              </Button>
            </div>
            <p className="text-gray-700 text-xl font-medium">
              Everything you need for a stronger visa file
            </p>
          </div>

          {/* Benefits List - Section 1 */}
          <div className="space-y-5">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                <HiDocumentText className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Visa-focused documentation support</h3>
                <p className="text-gray-600">Your file looks consistent and complete for visa officers.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                <BsCalendarCheck className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Dummy flight tickets + hotel booking support</h3>
                <p className="text-gray-600">Match your itinerary and avoid date mismatches in your visa file.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                <BsFileEarmarkCheck className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Simple process</h3>
                <p className="text-gray-600">Share details → get a ready-to-submit document set.</p>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-700 text-xl font-medium mb-5">
              Quick, clear, and secure
            </p>

            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-xl flex-shrink-0">
                  <MdSpeed className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Fast service</h3>
                  <p className="text-gray-600">Designed for tight appointment timelines.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-xl flex-shrink-0">
                  <MdPayment className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Secure payment and clear pricing</h3>
                  <p className="text-gray-600">You always know the cost upfront. No surprises.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-xl flex-shrink-0">
                  <FaHeadset className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Friendly support</h3>
                  <p className="text-gray-600">We guide you step-by-step through the process.</p>
                </div>
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
            alt="Why Choose Eazy Visas"
            width={600}
            height={500}
            className="w-full rounded-xl max-h-[500px] shadow-lg"
          />
        </div>
      </Layout>
    </section>
  );
}