import AboutUs from "@/components/home/AboutUs";
import Destinations from "@/components/home/Destinations";
import Hero from "@/components/home/Hero";
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
    </div>
  );
}
