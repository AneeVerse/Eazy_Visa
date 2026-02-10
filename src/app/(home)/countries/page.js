import Layout from '../../../components/common/Layout'
import CountryBanner from '../../../components/countries/CountryBanner'
import CountrySection from '../../../components/countries/CountrySection'
import CountrySectionWrapper from '../../../components/countries/CountrySectionWrapper'
import VisaSolutions from '../../../components/countries/CountryVisaSolution'
import BlogSection from '../../../components/home/BlogSection'
import Footer from '../../../components/Layout/Footer'
import React from 'react'


export const metadata = {
  title: "Countries | Eazy Visas",
  description: "Eazy Visas is a one-stop solution for all your visa needs.",
  alternates: {
    canonical: '/countries',
  },
  openGraph: {
    title: "Countries | Eazy Visas",
    description: "Eazy Visas is a one-stop solution for all your visa needs.",
    url: 'https://www.eazyvisas.com/countries',
    type: 'website',
    siteName: 'Eazy Visas',
    images: [{ url: '/logo/main-logo.png', width: 1200, height: 630, alt: 'Visa Options for Dream Destinations' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Countries | Eazy Visas",
    description: "Eazy Visas is a one-stop solution for all your visa needs.",
    images: ['/logo/main-logo.png'],
  },
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
        <div className="absolute blur-[200px] rounded-full -z-10 top-[30%] md:top-[40%] -left-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>
        <BlogSection />
        <div className="relative  z-30">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default page