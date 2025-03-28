import Layout from '@/components/common/Layout'
import CountrySection from '@/components/countries/CountrySection'
import React from 'react'

const page = () => {
  return (
    <div>
      <Layout>
        <CountrySection />
      </Layout>
    </div>
  )
}

export default page