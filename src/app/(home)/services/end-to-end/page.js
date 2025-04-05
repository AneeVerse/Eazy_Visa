import Layout from '@/components/common/Layout'
import CountrySectionWrapper from '@/components/countries/CountrySectionWrapper'
import TouristVisaHero from '@/components/touristVisa/TouristVisaHero'
import React from 'react'

const page = () => {
  return (
    <div>
      
            <TouristVisaHero />
            <Layout>
                    <CountrySectionWrapper />
                  </Layout>
    </div>
  )
}

export default page