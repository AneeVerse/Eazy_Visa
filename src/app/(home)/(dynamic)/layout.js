import Footer from '@/components/Layout/Footer'
import React from 'react'

export const metadata = {
  title: "Blog | Eazy Visas",
  description: "Eazy Visas is a one-stop solution for all your visa needs.",
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