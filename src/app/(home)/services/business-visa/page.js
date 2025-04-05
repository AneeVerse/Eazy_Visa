import Layout from '@/components/common/Layout'
import CountrySection from '@/components/countries/CountrySection'
import BusinessVisaHero from '@/components/services/BusinessVisaHero'
import TouristVisaHero from '@/components/touristVisa/TouristVisaHero'
import React from 'react'

const page = () => {
  return (
    <div>

            <BusinessVisaHero />
      <Layout>
        <CountrySection />
      </Layout>
    </div>
  )
}

export default page