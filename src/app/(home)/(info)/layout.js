import Footer from '../../../components/Layout/Footer'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        {children}
        <Footer />
    </div>
  )
}

export default layout