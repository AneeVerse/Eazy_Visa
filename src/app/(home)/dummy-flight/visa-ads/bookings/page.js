"use client";

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Layout from '../../../../../components/common/Layout';
import Footer from '../../../../../components/Layout/Footer';
import FlightBookingComponent from '../../../../../components/dummyFlight/DummyBooking';
import HotelBookingComponent from '../../../../../components/dummyHotel/HotelBookingComponent';
import MostPreferredBooking from '../../../../../components/dummyFlight/MostPreferredBooking';
import Button from '../../../../../components/common/Button';

const normalizeType = (type) => {
  if (type === 'most-preferred' || type === 'both') return 'most-preferred';
  if (type === 'hotel') return 'hotel';
  return 'flight';
};

const AdsBookingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const formType = useMemo(
    () => normalizeType(searchParams.get('type')),
    [searchParams]
  );

  const handleFormSwitch = (type) => {
    const normalized = normalizeType(type);
    router.replace(`/dummy-flight/visa-ads/bookings?type=${normalized}`);
  };

  const renderForm = () => {
    if (formType === 'hotel') {
      return (
        <HotelBookingComponent
          origin="landing-hotel"
          onTabClick={handleFormSwitch}
        />
      );
    }

    if (formType === 'most-preferred') {
      return (
        <MostPreferredBooking
          origin="landing-most-preferred"
          onTabClick={handleFormSwitch}
        />
      );
    }

    return (
      <FlightBookingComponent
        origin="landing-flight"
        onTabClick={handleFormSwitch}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout className="pt-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <Button
              onClick={() => router.push('/dummy-flight/visa-ads')}
              className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
            >
              ← Back to Offers
            </Button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-6">{renderForm()}</div>
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default AdsBookingPage;

