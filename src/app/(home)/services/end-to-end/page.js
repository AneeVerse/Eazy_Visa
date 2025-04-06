import Layout from '@/components/common/Layout'
import StatsBar from '@/components/common/StatsBar'
import CountrySectionWrapper from '@/components/countries/CountrySectionWrapper'
import TouristVisaHero from '@/components/touristVisa/TouristVisaHero'
import React from 'react'

const page = () => {
  return (
    <div>
      
            <TouristVisaHero />
            <StatsBar/>
            <Layout>
                    <CountrySectionWrapper />
                  </Layout>
    </div>
  )
}

export default page