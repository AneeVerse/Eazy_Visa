"use client";
import FlightPathAnimation from "../components/common/FlightPathAnimation";
import Layout from "../components/common/Layout";
import PopupForm from "../components/common/PopupForm";
import AboutUs from "../components/home/AboutUs";
import BlogSection from "../components/home/BlogSection";
import Destinations from "../components/home/Destinations";
import FeedbackReviewComponent from "../components/home/FeedbackReviewComponent";
import Hero from "../components/home/Hero";
import MediaTestimonials from "../components/home/MediaTestimonials";
import OneStopSolutions from "../components/home/OneStopSolutions"
import TravelPoint from "../components/home/TravelPoint";
import VisaSolutions from "../components/home/VisaSolutions";
import Footer from "../components/Layout/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* blur bg color effect */}

      <div className="absolute blur-[200px] top-[0%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>
      <div className="relative overflow-hidden">

        <div className="absolute blur-[200px] -z-10 rounded-full top-[20%] -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>

        <Hero />
        <div className="relative">

          <div className="absolute blur-[200px] top-[30%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>
          <Destinations />
          <Layout>
            <FlightPathAnimation />

          </Layout>
          <OneStopSolutions />
        </div>
      </div>
      <VisaSolutions />
      <div className="relative">

        <div className="absolute blur-[200px] rounded-full top-[20%] -z-10 -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>

        <div className="absolute blur-[200px] top-[40%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>

        <Layout>
          <FlightPathAnimation />

        </Layout>
        <AboutUs />
      </div>
      <div className="relative overflow-hidden">

        <div className="absolute blur-[200px] top-[40%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>
        <TravelPoint />
        <Layout>
          <FeedbackReviewComponent />
          {/* <MediaTestimonials /> */}

        </Layout>
      </div>
      <div className="relative overflow-hidden">

        {/* <div className="absolute blur-[200px] rounded-full top-[20%] -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div> */}
        <div className="absolute blur-[200px] rounded-full -z-10 top-[30%] md:top-[40%] -left-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>
        <BlogSection />
        <div className="relative  z-30">
          <Footer />
        </div>
      </div>
      {/* <div className="block sm:hidden"> */}
      <PopupForm />
      {/* </div> */}
    </div>
  );
}
