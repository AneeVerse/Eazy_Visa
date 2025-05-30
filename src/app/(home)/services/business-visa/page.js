import Layout from '../../../../components/common/Layout'
import StatsBar from '../../../../components/common/StatsBar'
import CountrySection from '../../../../components/countries/CountrySection'
import CountrySectionWrapper from '../../../../components/countries/CountrySectionWrapper'
import BusinessVisaHero from '../../../../components/services/BusinessVisaHero'
import TouristVisaHero from '../../../../components/touristVisa/TouristVisaHero'
import React from 'react'

const page = () => {
  return (
    <div>

            <BusinessVisaHero />
            <StatsBar/>
      <Layout>
        <CountrySectionWrapper />
      </Layout>
    </div>
  )
}

export default page