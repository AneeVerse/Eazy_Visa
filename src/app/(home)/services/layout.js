import VisaSolutions from '@/components/countries/CountryVisaSolution'
import BlogSection from '@/components/home/BlogSection'
import Footer from '@/components/Layout/Footer'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div className='mt-[100px]'>
            {children}
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

export default layout