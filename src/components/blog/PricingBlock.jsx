import React from 'react';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

const DEFAULT_PLANS = [
  {
    name: "Flight Itinerary",
    description: "24 Hours Delivery",
    price: "999",
    billing: "per person",
    note: "",
    features: [
      "24 Hours Delivery",
      "Unlimited Flights",
      "Name change not allowed"
    ],
    url: "/book-flight-hotel-dummy-ticket-for-visa",
    popular: false
  },
  {
    name: "Hotel Booking",
    description: "24 Hours Delivery",
    price: "999",
    billing: "per person",
    note: "*Price applicable for 2+ passengers",
    features: [
      "24 Hours Delivery",
      "Verifiable Hotel Confirmation",
      "Name change not allowed"
    ],
    url: "/book-flight-hotel-dummy-ticket-for-visa",
    popular: false
  },
  {
    name: "Daywise Itinerary",
    description: "24 Hours Delivery",
    price: "999",
    billing: "per person",
    note: "",
    features: [
      "24 Hours Delivery",
      "Day wise Sightseeing",
      "Details of the tour for the duration"
    ],
    url: "/book-flight-hotel-dummy-ticket-for-visa",
    popular: false
  },
  {
    name: "Most Preferred",
    description: "24 Hours Delivery",
    price: "1499",
    billing: "per person",
    note: "*Price applicable for 2+ passengers",
    features: [
      "24 Hours Delivery",
      "Flight Itinerary",
      "Hotel Confirmation",
      "Day wise Itinerary",
      "Name change not allowed"
    ],
    url: "/book-flight-hotel-dummy-ticket-for-visa",
    popular: true
  }
];

export default function PricingBlock({ value }) {
  if (!value) return null;

  const plans = (value.mode === 'custom' && value.customPlans && value.customPlans.length > 0)
    ? value.customPlans.map((p) => ({
        name: p.name || 'Package',
        price: p.price || '0',
        billing: p.billing || 'per person',
        note: p.note || '',
        features: p.features || [],
        url: p.url || '/book-flight-hotel-dummy-ticket-for-visa',
        popular: !!p.popular,
        buttonText: p.buttonText || 'Get Started',
      }))
    : DEFAULT_PLANS;

  const showBadge = value.showBadge !== false;

  return (
    <div className="my-12 pt-6 not-prose">
      {value.heading && (
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
          {value.heading}
        </h3>
      )}
      {value.subheading && (
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">
          {value.subheading}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 justify-items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl bg-white transition-all duration-300 hover:shadow-xl flex flex-col h-full w-full border ${
              plan.popular
                ? 'border-2 border-blue-500 shadow-blue-100/50 shadow-lg'
                : 'border-gray-200/80 shadow-sm'
            }`}
          >
            {/* Most Popular Pill Badge */}
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm">
                  Most Popular
                </span>
              </div>
            )}

            {/* 24 FAST DELIVERY Badge */}
            {showBadge && (
              <div className="absolute -top-6 -right-1 p-1 z-10 pointer-events-none">
                <img
                  src="/images/pricing/hourly-badge1.png"
                  alt="24 Fast Delivery"
                  className="w-12 h-12 sm:w-14 sm:h-14"
                />
              </div>
            )}

            {/* Top Card Info */}
            <div className="p-3 sm:p-4">
              <div className="!text-base sm:!text-lg font-bold text-gray-900 mb-2 leading-tight">
                {plan.name}
              </div>

              <div className="mb-1.5 flex items-baseline flex-wrap">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">
                  ₹{plan.price}
                </span>
                <span className="text-gray-600 text-[11px] sm:text-xs font-medium ml-1">
                  /{plan.billing}
                </span>
              </div>

              {plan.note ? (
                <p className="text-blue-500 text-[10px] font-medium mt-0.5">
                  {plan.note}
                </p>
              ) : (
                <div className="h-3.5"></div>
              )}
            </div>

            {/* Features List Section */}
            <div className="border-t border-gray-100 px-3 sm:px-4 pt-3 pb-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="!text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap mb-2.5 leading-none">
                  WHAT&apos;S INCLUDED:
                </div>
                <ul className="space-y-2">
                  {plan.features?.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-3.5 w-3.5 mr-1.5 mt-0.5 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                        <FaCheck className="h-2 w-2" />
                      </div>
                      <span className="text-gray-700 text-[11px] sm:text-xs leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <Link
                  href={plan.url || "/book-flight-hotel-dummy-ticket-for-visa"}
                  className={`w-full block text-center py-2 px-2.5 rounded-lg font-semibold text-xs transition-all duration-200 shadow-sm ${
                    plan.popular
                      ? 'pricing-btn-popular bg-blue-600 hover:bg-blue-700 !text-white'
                      : 'pricing-btn-standard'
                  }`}
                >
                  {plan.buttonText || "Get Started"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
