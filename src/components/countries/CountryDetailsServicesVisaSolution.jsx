"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Heading } from "../common/Typography";
import Layout from "../common/Layout";
import Link from "next/link";

const services = [

  {
    id: 4,
    title: "Dummy Bookings",
    url: "/dummy-bookings",
    description: "Dummy bookings for visa applications and travel plans",
    image:
      "/images/home/dummy-flight.webp",
    rating: 4.9,
    size: "large",
  },
  {
    id: 1,
    title: "Tourist Visa",
    url: "/services/tourist-visa",
    description: "Complete assistance for tourist visa applications to your dream destinations",
    image:
      "/images/home/tourist-visa.png",
    rating: 4.9,
    size: "small",
  },
  {
    id: 2,
    title: "Business Visa",
    url: "/services/business-visa",
    description: "Streamlined business visa processing for corporate travelers",
    image: "/images/home/business-visa.webp",
    rating: 4.3,
    size: "small",
  },
  {
    id: 3,
    title: "End to End visa assistance",
    url: "/services/end-to-end",
    description: "Comprehensive visa support from documentation to approval",
    image: "/images/home/passport-image.png",
    rating: 4.7,
    size: "small",
  },
  {
    id: 5,
    title: "Dummy Hotel",
    url: "/services/dummy-hotel",
    description: "Curated hotel selections for your perfect stay abroad",
    image:
    "/images/home/dummy-hotel.webp",
    rating: 4.6,
    size: "large",
  },
];

export default function CountryDetailsServicesVisaSolution() {
  return (
    <section className="py-4 ">
      <div>
      <div className="px-4 text-center">
        <Heading level={2} className="text-secondary-500 mb-10">
          End to End Visa Solutions, <br /> Personalized Service, Secure Payment
        </Heading>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        {services.slice(0, 3).map((place) => (
          <Link
          href={`${place.url}`}
            key={place.id}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={place.image}
              alt={place.title}
              width={500}
              height={300}
              className="w-full h-[300px] group-hover:scale-110 group-active:scale-110 transition-all duration-300 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg"/>
            <div className="absolute bottom-4 left-4 right-4 bg-white group-active:-translate-y-2 group-hover:-translate-y-2 transition-all duration-300 shadow-md rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {place.title}
                </h3>
                <p className="text-sm line-clamp-2 text-gray-500">{place.description}</p>
                {/* <div className="inline-flex mt-3 items-center bg-[#F2DBB1] text-[#DD9115] px-3 py-1 rounded-full text-[12px]">
                  <FaStar className="mr-1" />
                  {place.rating}
                </div> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
</div>
    </section>
  );
}
