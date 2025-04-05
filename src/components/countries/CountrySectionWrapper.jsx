// components/countries/CountrySectionWrapper.jsx
"use client";

import { Suspense } from 'react';
import CountryCardSkeleton from '../common/CountryCardSkeleton';
import CountrySection from './CountrySection';

export default function CountrySectionWrapper() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-2 mt-12 md:grid-cols-3 lg:grid-cols-4 justify-around gap-3 md:gap-6">
        {Array.from({ length: 12 }, (_, index) => (
          <CountryCardSkeleton isWidthFull={true} key={index} />
        ))}
      </div>
    }>
      <CountrySection />
    </Suspense>
  );
}