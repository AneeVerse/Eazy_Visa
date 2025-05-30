import VisaSolutions from '../../../components/countries/CountryVisaSolution'
import BlogSection from '../../../components/home/BlogSection'
import Footer from '../../../components/Layout/Footer'
import React from 'react'


export const metadata = {
  title: "Services | Eazy Visas",
  description: "Eazy Visas is a one-stop solution for all your visa needs.",
}

const layout = ({ children }) => {
    return (
        <div className='mt-[80px] relative overflow-x-hidden'>
            
      <div className="absolute blur-[200px] top-[0%] -left-[30px] -z-10 w-[300px] h-[300px] bg-[#0B82E6] opacity-50"></div>

      <div className="absolute blur-[200px] -z-10 rounded-full top-[20%] -z-10 -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>
            {children}
            <VisaSolutions />
            <div className="relative overflow-hidden">

                {/* <div className="absolute blur-[200px] rounded-full top-[20%] -right-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div> */}
                <div className="absolute blur-[200px] -z-10 rounded-full top-[30%] md:top-[40%] -left-[14%]  w-[500px] h-[500px] bg-[#0B82E6] opacity-50"></div>
                <BlogSection />
                <div className="relative  z-30">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default layout