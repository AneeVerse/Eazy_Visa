import Image from "next/image";
import Layout from "../common/Layout";

const flightsData = [
  {
    city: "Chennai",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Delhi, Mumbai, Coimbatore, Madurai",
  },
  {
    city: "Goa",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Delhi, Mumbai, Bangalore, Ahmedabad",
  },
  {
    city: "Mumbai",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Delhi, Bangalore, Chennai, Ahmedabad",
  },
  {
    city: "Hyderabad",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Chennai, Mumbai, Bangalore, Delhi",
  },
  {
    city: "Delhi",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Mumbai, Pune, Bangalore, Chennai",
  },
  {
    city: "Pune",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Delhi, Bangalore, Chennai, Ahmedabad",
  },
  {
    city: "Kolkata",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Delhi, Mumbai, Bangalore, Pune",
  },
  {
    city: "Bangalore",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Delhi, Pune, Mumbai, Kolkata",
  },
  {
    city: "Jaipur",
    image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    routes: "Mumbai, Delhi, Pune, Bangalore",
  },
];

export default function FlightsComponent() {
  return (
    <Layout className=" my-16 ">
      <div className="grid grid-cols-1 rounded-xl p-6 shadow-md md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flightsData.map((flight, index) => (
          <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
            <div className="w-12 min-w-12 h-12 relative">
              <Image
                src={`/${flight.image}`}
                alt={flight.city}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{flight.city} Flights</h3>
              <p className="text-sm text-gray-600">Via - {flight.routes}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
