import Layout from '@/components/common/Layout';
import { Heading } from '@/components/common/Typography';
import Footer from '@/components/Layout/Footer';
import Link from 'next/link';
import { FaPlane, FaHotel, FaMapMarkedAlt, FaStar, FaCheck, FaInfoCircle } from 'react-icons/fa';

const PricingPage = () => {
  const plans = [
    {
      name: "Flight Itinerary",
      url: "/services/dummy-flights",
      price: "999",
      icon: <FaPlane className="text-blue-500 text-3xl" />,
      features: [
        "24 Hours Delivery",
        "Unlimited Flights",
        "Unlimited Corrections",
        "Name change not allowed"
      ],
      popular: false
    },
    {
      name: "Hotel Booking",
      url: "/services/dummy-hotel",
      price: "999",
      icon: <FaHotel className="text-green-500 text-3xl" />,
      features: [
        "24 Hours Delivery",
        "Verifiable Hotel Confirmation",
        "Unlimited Corrections",
        "Name change not allowed"
      ],
      popular: false
    },
    {
      name: "Daywise Itinerary",
      url: "/services/dummy-hotel",
      price: "999",
      icon: <FaMapMarkedAlt className="text-purple-500 text-3xl" />,
      features: [
        "24 Hours Delivery",
        "Day wise Sightseeing",
        "Details of the tour for the duration",
        "Name change not allowed"
      ],
      popular: false
    },
    {
      name: "Most Preferred",
      
      url: "/services/dummy-hotel",
      price: "1499",
      icon: <FaStar className="text-yellow-500 text-3xl" />,
      features: [
        "24 Hours Delivery",
        "Flight Itinerary",
        "Hotel Confirmation",
        "Day wise Itinerary",
        "Name change not allowed"
      ],
      popular: true,
      note: "*Price applicable for 2+ passengers"
    }
  ];

  return (
    <>
    <div className="min-h-screen overflow-x-hidden  py-12">
        
      <div className="absolute blur-[200px] top-[0%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>
      <Layout >
      {/* Header Section */}
      <div 
            className="text-center mb-16"
          >
            <Heading animate={true} level={1}  className=" font-bold text-gray-900">
              Pricing
            </Heading>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-600">
              Below prices are per person. <span className="font-medium">Special group discounts</span> available for 4+ travelers.
            </p>
            
            <div className="mt-8 max-w-2xl mx-auto bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex items-start">
              <FaInfoCircle className="flex-shrink-0 mt-1 text-blue-500 mr-3" />
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> These itineraries are designed specifically for visa applications and do not constitute actual bookings or confirmations.
              </p>
            </div>
          </div>


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-lg border border-gray-200 bg-white shadow-sm flex flex-col ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 whitespace-nowrap rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="p-4 ">
                <div className="flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                <h2 className="text-lg font-medium text-center text-gray-900 mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold text-center text-gray-900 mb-6">
                  ₹{plan.price}
                  <span className="text-base font-normal text-gray-500">/person</span>
                </p>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto p-6 bg-gray-50 rounded-b-lg">
                {plan.note && (
                  <p className="text-xs text-gray-500 mb-3 text-center">{plan.note}</p>
                )}
                <Link
                 href={plan.url}
                  className={`w-full cursor-pointer block text-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-900'}`}
                >
                  BUY NOW
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div
            className="mt-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-8 sm:p-10 sm:pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Group Travel Special</h3>
                  <p className="text-blue-100 max-w-lg">
                    Planning a trip with friends or family? We offer exclusive discounts for groups of 4+ travelers.
                    Get personalized quotes and dedicated support for your group visa application.
                  </p>
                </div>
                <Link href={"/contact"} className="px-8 py-3 bg-white text-blue-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md whitespace-nowrap">
                  Request Group Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24h</div>
              <div className="text-gray-600 mt-1">Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">99%</div>
              <div className="text-gray-600 mt-1">Visa Approval</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10k+</div>
              <div className="text-gray-600 mt-1">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 mt-1">Support</div>
            </div>
          </div>

      </Layout>
    </div>
    
    
    <Footer />
    </>
  );
};

export default PricingPage;