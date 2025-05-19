"use client";
import Layout from "../common/Layout";
import ConsultationForm from "../common/ConsultationForm";
import FormComponent from "../common/FormComponent";

export default function BusinessVisaHero() {
  return (
    <Layout className="relative mt-[40px] flex flex-col lg:flex-row justify-between items-center gap-12 pb-12">
      {/* left Content - Scrolling Images */}
      {/* Left Content */}
      <div className="lg:w-1/2 relative">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={"/images/landmarks/Big Ben tourist places in United Kingdom UK Visa.webp"}
            alt={"title"}
            className="w-full h-[580px]  object-cover"
          />
          <div className="absolute   inset-0 bg-black/20"></div>
          {/* Text Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
            <h2 className="text-3xl font-bold text-white">
              Explore Beautiful Destinations
            </h2>
          </div>
        </div>
      </div>

      {/* right Content */}
      <div className="relative flex-1">
        <FormComponent />
      </div>
    </Layout>
  );
}
