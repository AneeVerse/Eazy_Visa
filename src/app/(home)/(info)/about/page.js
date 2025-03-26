// pages/about.js
import { FaLightbulb, FaRocket, FaUsers, FaHandshake } from 'react-icons/fa';
import TeamMember from "@/components/TeamMember" // You'll create this component
import Layout from '@/components/common/Layout';

export default function About() {
  return (
    <div className="min-h-screen relative  py-20 ">
             <div className="absolute blur-[200px] top-[0%] -left-[30px]  w-[400px] h-[400px] bg-[#0B82E6] opacity-50"></div>
      <Layout className="">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering digital solutions that transform businesses and empower users worldwide.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl shadow-indigo-100">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why We Exist
                </h2>
                <p className="text-gray-600 mb-6">
                  At Eazy Visa, we believe technology should simplify life, not complicate it. Founded in 2020, we set out to create intuitive digital experiences that solve real problems.
                </p>
                <p className="text-gray-600">
                  Today, we&apos;re a team of 50+ innovators, designers, and problem-solvers committed to building the future, one elegant solution at a time.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl p-8 h-full flex items-center justify-center">
                <FaLightbulb className="text-7xl text-indigo-600 opacity-80" />
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
                icon: <FaRocket className="text-3xl text-indigo-600" />,
                title: "Innovation",
                desc: "We challenge the status quo to create breakthrough solutions"
              },
              {
                icon: <FaUsers className="text-3xl text-indigo-600" />,
                title: "People First",
                desc: "Our users and team are at the heart of everything we do"
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
              }
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
        <section className="mb-20">
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
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
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