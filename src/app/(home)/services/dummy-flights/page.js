import Layout from '../../../../components/common/Layout'
import DummyBooking from '../../../../components/dummyFlight/DummyBooking'
import FlightsComponent from '../../../../components/dummyFlight/FlightsComponent'
import FeedbackReviewComponent from '../../../../components/home/FeedbackReviewComponent'
import MediaTestimonials from '../../../../components/home/MediaTestimonials'
import React from 'react'

const page = () => {
  return (
    <div>
      <DummyBooking />
      {/* <FlightsComponent /> */}

      <Layout >
        <FeedbackReviewComponent />
        {/* <MediaTestimonials /> */}

      </Layout >
    </div>
  )
}

export default page