"use client";

import Image from "next/image";
import { Heading, Subheading } from "../common/Typography";
import Layout from "../common/Layout";

const states = [
  {
    number: "200+",
    title: "Holiday Package",
  },
  {
    number: "450",
    title: "RedDoorz",
  },
  {
    number: "10",
    title: "Premium Airlines",
  },
  {
    number: "12k+",
    title: "Happy Customer",
  },
];

export default function TravelPoint() {
  return (
    <section className="relative py-16 ">
      <Layout className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="relative md:w-1/2">
          <div className="relative w-full z-10">
            <Image
              src="/images/home/person.png"
              alt="Traveler"
              width={500}
              height={500}
              className="w-full"
              draggable={false}
            />
          </div>
          {/* Background Circle Design */}
          <div className="absolute top-0 lg:top-10 left-5 lg:left-20 w-[30px] h-[30px] bg-blue-300 rounded-full blur-[2px]"></div>
          <div className="absolute top-16 right-5 w-5 h-5 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-0 lg:top-2 right-0 lg:right-5 w-[80px] h-[80px] bg-gradient-to-b from-purple-400 to-purple-900  rounded-full  blur-[5px]"></div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 space-y-6 text-white">
          <Subheading className="text-primary-500 mb-2 uppercase tracking-widest">
            {" "}
            Travel Point
          </Subheading>
          <Heading level={2} className="text-secondary-500 mb-10">
            We help you find your dream destination
          </Heading>

          <p className="text-[#A8A8A8]">
            Hey! Travelo there to help you find your dream holiday. Easy, you
            just find where you want to go and buy the ticket.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {states.map((state, index) => (
              <div
                key={index}
                className="bg-white flex flex-col gap-2 justify-center items-center h-[150px]  px-6 py-4 rounded-3xl border border-[#191825]/10"
              >
                <h3 className="text-2xl sm:text-4xl text-[#872BFF] font-bold">
                  {state.number}
                </h3>
                <p className="text-md sm:text-lg text-[#A8A8A8]">
                  {state.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </section>
  );
}
