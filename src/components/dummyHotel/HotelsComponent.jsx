import Image from "next/image";
import Layout from "../common/Layout";

const hotelsData = [
    {
      city: "Goa",
     
    image: "images/dummy-flight/goa.webp",
      categories: "Hotels, Budget Hotels, Resorts, Best Hotels, North Goa, Villas",
    },
    {
      city: "Ooty",
     
    image: "images/dummy-flight/ooty.webp",
      categories: "Hotels, Resorts, Cottages, Budget Hotels, Homestay",
    },
    {
      city: "Jaipur",
      image: "images/dummy-flight/jaipur.avif",
      categories: "Hotels, Resorts, Budget Hotels, Best Hotels, Near Railway Station",
    },
    {
      city: "Delhi",
      image: "images/dummy-flight/delhi.avif",
      categories: "Hotels, Budget Hotels, Resorts, Best Hotels, Near IGI Airport",
    },
    {
      city: "Mumbai",
      image: "images/dummy-flight/mumbai.webp",
      categories: "Hotels, Budget Hotels, Resorts, Couple Hotels, Near Mumbai Airport",
    },
    {
      city: "Manali",
   
      image: "images/dummy-flight/manali.avif",
      categories: "Hotels, Resorts, Budget Hotels, Best Hotels, Near Mall Road",
    },
    {
      city: "Bangalore",
      image: "images/dummy-flight/bangalore.webp",
      categories: "Hotels, Budget Hotels, Resorts, Near Airport, Guhantara Resort",
    },
    {
      city: "Shimla",
     
    image: "images/dummy-flight/shimla.webp",
      categories: "Hotels, Budget Hotels, Best Hotels, Resorts, Near Mall Road",
    },
    {
      city: "Dubai",
      image: "images/dummy-flight/dubai.webp",
      categories: "Hotels, Budget Hotels, 5 Star Hotels, Apart-Hotels, Homestays",
    },
    // {
    //   city: "Singapore",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Hotels, 5 Star Hotels, Little India, Orchard Road, Hostels, Hotels in Sentosa",
    // },
    // {
    //   city: "Bangkok",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Hotels, 3 Star Hotels, 5 Star Hotels, Hostels, Budget Hotels, Hotels in Sukhumvit",
    // },
    // {
    //   city: "Pattaya",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Hotels, Budget Hotels, 5 Star Hotels, Resorts, Central Pattaya, Beachfront Properties",
    // },
    // {
    //   city: "Phuket",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Hotels, Resorts, Budget Hotels, Beachfront Properties",
    // },
    // {
    //   city: "Bali",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Hotels, Resorts, 5 Star Hotels, Budget Hotels, Villas In Bali, Beachfront Properties",
    // },
    // {
    //   city: "Maldives",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Hotels, 3 Star Hotels, Resorts, 5 Star Hotels, 4 Star Hotels, Hotels in Male",
    // },
    // {
    //   city: "Others",
    //   image: "images/landmarks/Wawel Castle tourist places in Poland Visa.webp",
    //   categories: "Puri Hotels, OYO Delhi, Alleppey Houseboat, Mahabaleshwar Hotels",
    // },
  ];
  

export default function HotelsComponent() {
  return (
    <Layout className="my-16  ">
      <div className="grid grid-cols-1 border-gray-200 bg-white border rounded-xl p-3  sm:p-6 shadow-md md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelsData.map((hotel, index) => (
          <div key={index} className="flex items-center space-x-4 bg-white">
            <div className="w-12 min-w-12 h-12 relative">
              <Image
                src={`/${hotel.image}`}
                alt={hotel.city}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-md text-secondary-500 font-semibold">{hotel.city} Hotels</h3>
              <p className="text-sm text-gray-500">{hotel.categories}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
