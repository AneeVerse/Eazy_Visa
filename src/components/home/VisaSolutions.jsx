"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const places = [
  {
    id: 1,
    title: "Arctic Glacier Retreat",
    location: "Svalbard, Norway",
    image: "/images/fjordview.jpg",
    rating: 4.8,
    size: "small",
  },
  {
    id: 2,
    title: "Northern Lights Escape",
    location: "Tromsø, Norway",
    image: "/images/northern-lights.jpg",
    rating: 4.5,
    size: "small",
  },
  {
    id: 3,
    title: "Hidden Lake Cabin",
    location: "Oslo, Norway",
    image: "/images/oslo-forest.jpg",
    rating: 4.7,
    size: "small",
  },
  {
    id: 4,
    title: "Snowy Haven Resort",
    location: "Bergen, Norway",
    image: "/images/fjordview.jpg",
    rating: 4.9,
    size: "large",
  },
  {
    id: 5,
    title: "Aurora Borealis Lodge",
    location: "Lapland, Finland",
    image: "/images/northern-lights.jpg",
    rating: 4.6,
    size: "large",
  },
];

export default function VisaSolutions() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          End to End Visa Solutions, <br /> Personalized Service, Secure Payment
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
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
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{place.title}</h3>
                <p className="text-sm text-gray-600">{place.location}</p>
              </div>
              <div className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                <FaStar className="mr-1" />
                {place.rating}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-6xl mx-auto">
        {places.slice(3, 5).map((place) => (
          <div
            key={place.id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={place.image}
              alt={place.title}
              width={600}
              height={350}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{place.title}</h3>
                <p className="text-sm text-gray-600">{place.location}</p>
              </div>
              <div className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                <FaStar className="mr-1" />
                {place.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
