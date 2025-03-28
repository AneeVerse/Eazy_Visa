import Layout from '@/components/common/Layout'
import CountrySection from '@/components/countries/CountrySection'
import TouristVisaHero from '@/components/touristVisa/TouristVisaHero'
import React from 'react'

const page = () => {
  return (
    <div>
      <TouristVisaHero />
      
      <Layout>
        <CountrySection />
      </Layout>
    </div>
  )
}

export default page