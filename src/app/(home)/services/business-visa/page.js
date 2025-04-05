import Layout from '@/components/common/Layout'
import CountrySection from '@/components/countries/CountrySection'
import CountrySectionWrapper from '@/components/countries/CountrySectionWrapper'
import BusinessVisaHero from '@/components/services/BusinessVisaHero'
import TouristVisaHero from '@/components/touristVisa/TouristVisaHero'
import React from 'react'

const page = () => {
  return (
    <div>

            <BusinessVisaHero />
      <Layout>
        <CountrySectionWrapper />
      </Layout>
    </div>
  )
}

export default page