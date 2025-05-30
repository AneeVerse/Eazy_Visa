import Layout from '../../../../components/common/Layout'
import HotelBookingComponent from '../../../../components/dummyHotel/HotelBookingComponent'
import HotelsComponent from '../../../../components/dummyHotel/HotelsComponent'
import FeedbackReviewComponent from '../../../../components/home/FeedbackReviewComponent'
import MediaTestimonials from '../../../../components/home/MediaTestimonials'
import React from 'react'

const page = () => {
  return (
    <div>
      <HotelBookingComponent />
      {/* <HotelsComponent /> */}
      <Layout >
        <FeedbackReviewComponent />
        {/* <MediaTestimonials /> */}
      </Layout>
    </div>
  )
}

export default page