import VisaSolutions from '@/components/countries/CountryVisaSolution'
import BlogSection from '@/components/home/BlogSection'
import Footer from '@/components/Layout/Footer'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='mt-[100px]'>
        {children}
        <VisaSolutions />
        
        <BlogSection />

        <Footer />
    </div>
  )
}

export default layout