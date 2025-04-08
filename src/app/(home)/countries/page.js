import Layout from '@/components/common/Layout'
import CountryBanner from '@/components/countries/CountryBanner'
import CountrySection from '@/components/countries/CountrySection'
import CountrySectionWrapper from '@/components/countries/CountrySectionWrapper'
import VisaSolutions from '@/components/countries/CountryVisaSolution'
import BlogSection from '@/components/home/BlogSection'
import Footer from '@/components/Layout/Footer'
import React from 'react'


export const metadata = {
  title: "Countries | Eazy Visa",
  description: "Eazy Visa is a one-stop solution for all your visa needs.",
}

const page = () => {
  return (
    <div>

      <CountryBanner
        image="/images/countries/banner.png"
        title="Discover Visa Options for Your Dream Destinations"
        subtitle="Find the perfect visa solution for your next adventure"
      />
      <Layout>
        <CountrySectionWrapper />

      </Layout>

      <VisaSolutions />
      <div className="relative overflow-hidden">

        {/* <div className="absolute blur-[200px] rounded-full top-[20%] -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div> */}
        <div className="absolute blur-[200px] rounded-full top-[30%] md:top-[40%] -left-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>
        <BlogSection />
        <div className="relative  z-30">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default page