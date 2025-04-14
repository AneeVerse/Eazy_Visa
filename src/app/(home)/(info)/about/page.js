// pages/about.js
import { FaLightbulb, FaRocket, FaUsers, FaHandshake, FaUserTie } from 'react-icons/fa';
import TeamMember from "@/components/TeamMember" // You'll create this component
import Layout from '@/components/common/Layout';


export const metadata = {
  title: "About Us | Eazy Visas",
  description: "Eazy Visas is a one-stop solution for all your visa needs.",
}

export default function About() {
  return (
    <div className="min-h-screen relative  py-20 ">
             <div className="absolute blur-[200px] top-[0%] -left-[30px] -z-10  w-[400px] h-[400px] bg-[#0B82E6] opacity-50"></div>
      <Layout className="">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Pioneering in solving complex visa application processes and simplifying them for end customers 
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl shadow-indigo-100">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
              <p className="text-gray-600 mb-6">
                Eazy Visas is a one stop shop for all your Visa documentation woes. We understand arranging documents for your visa application can be stressful. While your financials may be in place and you may feel confident about your visa application, there is still a possibility for your application to get rejected. In such a situation the flight tickets and hotel bookings are gone for a waste. Barring a huge
loss in penalty charged by the Airline or the Hotel or the Travel Agent.

                </p>
                <p className="text-gray-600 mb-6">
                However, what most people are unaware of is that the Embassy does not advise you to book a confirmed ticket or hotel booking. All they want is a flight itinerary and hotel booking along with a day wise itinerary to show that you have every intention of visiting their country and would be returning home.
                </p>
                <p className="text-gray-600">
                Our Flight itineraries, Hotel bookings, Day wise itinerary and Insurance policies are 100% verifiable and our customers have been successful in getting their visa application approved.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 h-full flex items-center justify-center">
             <img src='/logo/logo-white.png' />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
     {
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: "People First",
      desc: "Our users and team are at the heart of everything we do"
    },
    {
      icon: <FaUserTie className="text-3xl text-indigo-600" />,
      title: "Expert Advice",
      desc: "Get guidance from experienced visa consultants for your application"
    },
    {
      icon: <FaHandshake className="text-3xl text-indigo-600" />,
      title: "Integrity",
      desc: "We do what's right, even when no one is watching"
    },
    {
      icon: <FaLightbulb className="text-3xl text-indigo-600" />,
      title: "Simplicity",
      desc: "We believe complexity should be invisible to the user"
    },
  ].map((value, index) => (
    <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg shadow-indigo-100 hover:shadow-xl transition-shadow">
      <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        {value.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
      <p className="text-gray-600">{value.desc}</p>
    </div>
  ))}
</div>
        </section>

        {/* Team Section */}
        {/* <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet The Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember 
              name="Abhishek Sharma"
              role="Founder & CEO"
              bio="Visionary leader with 10+ years in tech innovation"
              imgSrc="/images/default-profile.jpg" // Replace with actual path
            />
            <TeamMember 
              name="Priya Patel"
              role="CTO"
              bio="Tech architect passionate about scalable solutions"
               imgSrc="/images/default-profile.jpg"
            />
            <TeamMember 
              name="Rahul Verma"
              role="Design Director"
              bio="Crafts experiences that users fall in love with"
               imgSrc="/images/default-profile.jpg"
            />
          </div>
        </section> */}

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-indigo-100">Team Members</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-indigo-100">Clients Worldwide</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">15M+</div>
              <div className="text-indigo-100">Users Impacted</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-indigo-100">Industry Awards</div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}