import AboutUs from "@/components/home/AboutUs";
import BlogSection from "@/components/home/BlogSection";
import Destinations from "@/components/home/Destinations";
import FeedbackReviewComponent from "@/components/home/FeedbackReviewComponent";
import Hero from "@/components/home/Hero";
import MediaTestimonials from "@/components/home/MediaTestimonials";
import OneStopSolutions from "@/components/home/OneStopSolutions"
import TravelPoint from "@/components/home/TravelPoint";
import VisaSolutions from "@/components/home/VisaSolutions";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Hero />
     <OneStopSolutions />
     <VisaSolutions />
        <Destinations />
        <AboutUs />
        <TravelPoint />
        <FeedbackReviewComponent />
        <MediaTestimonials />
        <BlogSection />
    </div>
  );
}
