import Footer from '@/components/Layout/Footer'
import React from 'react'

export const metadata = {
  title: "Blog | Eazy Visa",
  description: "Eazy Visa is a one-stop solution for all your visa needs.",
}

const layout = ({children}) => {
  return (
    <div>
        {children}
        <Footer />
    </div>
  )
}

export default layout