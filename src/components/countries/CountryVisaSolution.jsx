"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Heading } from "../common/Typography";
import Layout from "../common/Layout";

const places = [
  {
    id: 1,
    title: "Arctic Glacier Retreat",
    location: "Svalbard, Norway",
    image:
      "/images/landmarks/Sultan Qaboos Mosque tourist places in Oman Visa.webp",
    rating: 4.8,
    size: "small",
  },
  {
    id: 2,
    title: "Northern Lights Escape",
    location: "Tromsø, Norway",
    image: "/images/landmarks/Sydney Opera House in Australia Visa.webp",
    rating: 4.5,
    size: "small",
  },
  {
    id: 3,
    title: "Hidden Lake Cabin",
    location: "Oslo, Norway",
    image: "/images/landmarks/Atomium in Belgium Visa.webp",
    rating: 4.7,
    size: "small",
  },
  {
    id: 4,
    title: "Snowy Haven Resort",
    location: "Bergen, Norway",
    image:
      "/images/landmarks/Big Ben tourist places in United Kingdom UK Visa.webp",
    rating: 4.9,
    size: "large",
  },
  {
    id: 5,
    title: "Aurora Borealis Lodge",
    location: "Lapland, Finland",
    image: "/images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    rating: 4.6,
    size: "large",
  },
];

export default function VisaSolutions() {
  return (
    <section className="py-10 bg-gray-50">
      <Layout>
      <div className="px-4 text-center">
        <Heading level={2} className="text-secondary-500 mb-10">
          End to End Visa Solutions, <br /> Personalized Service, Secure Payment
        </Heading>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.slice(0, 3).map((place) => (
          <div
            key={place.id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={place.image}
              alt={place.title}
              width={500}
              height={300}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {place.title}
                </h3>
                <p className="text-sm text-gray-600">{place.location}</p>
                <div className="inline-flex mt-1 items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[12px]">
                  <FaStar className="mr-1" />
                  {place.rating}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     </Layout>
    </section>
  );
}
