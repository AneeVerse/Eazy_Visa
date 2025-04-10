import Image from "next/image";
import Layout from "../common/Layout";

const flightsData = [
  {
    city: "Chennai",
    image: "images/dummy-flight/chennai.avif",
    routes: "Delhi, Mumbai, Coimbatore, Madurai",
  },
  {
    city: "Goa",
    image: "images/dummy-flight/goa.webp",
    routes: "Delhi, Mumbai, Bangalore, Ahmedabad",
  },
  {
    city: "Mumbai",
    image: "images/dummy-flight/mumbai.webp",
    routes: "Delhi, Bangalore, Chennai, Ahmedabad",
  },
  {
    city: "Hyderabad",
    image: "images/dummy-flight/hyderabad.webp",
    routes: "Chennai, Mumbai, Bangalore, Delhi",
  },
  {
    city: "Delhi",
    image: "images/dummy-flight/delhi.avif",
    routes: "Mumbai, Pune, Bangalore, Chennai",
  },
  {
    city: "Pune",
    image: "images/dummy-flight/pune.webp",
    routes: "Delhi, Bangalore, Chennai, Ahmedabad",
  },
  {
    city: "Kolkata",
    image: "images/dummy-flight/kolkata.avif",
    routes: "Delhi, Mumbai, Bangalore, Pune",
  },
  {
    city: "Bangalore",
    image: "images/dummy-flight/bangalore.webp",
    routes: "Delhi, Pune, Mumbai, Kolkata",
  },
  {
    city: "Jaipur",
    image: "images/dummy-flight/jaipur.avif",
    routes: "Mumbai, Delhi, Pune, Bangalore",
  },
];

export default function FlightsComponent() {
  return (
    <Layout className=" my-16  ">
      <div className="grid grid-cols-1 bg-white border border-gray-200 rounded-xl p-3  sm:p-6 shadow-md md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flightsData.map((flight, index) => (
          <div key={index} className="flex items-center space-x-4 bg-white">
            <div className="w-12 min-w-12 h-12 relative">
              <Image
                src={`/${flight.image}`}
                alt={flight.city}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-md text-secondary-500 font-semibold">{flight.city} Flights</h3>
              <p className="text-sm text-gray-500">Via - {flight.routes}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
