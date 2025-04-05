"use client";

const CountryDetailsSkeleton = () => {
  return (
    <div className="animate-pulse mt-[90px]">
      {/* Banner Skeleton */}
      <div className="h-64 md:h-80 w-full bg-gray-200 rounded-t-xl"></div>

      {/* Main Content Skeleton */}
      <div className="mt-12 flex flex-col lg:flex-row gap-8">
        {/* Left Content Skeleton */}
        <div className="lg:w-2/3 space-y-12">
          {/* Visa Information Section Skeleton */}
          <div>
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="w-12 h-1 bg-gray-200 my-4"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                  <div className="mt-3 space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required Skeleton */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="w-12 h-1 bg-gray-200 my-4"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-5 w-48 bg-gray-200 rounded"></div>
                  <ul className="list-disc pl-5 space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <li key={j} className="h-3 w-full bg-gray-200 rounded"></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 w-64 bg-gray-200 rounded-lg mx-auto"></div>

          {/* Rejection Reasons Skeleton */}
          <div className="bg-white py-6 rounded-xl">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="w-12 h-1 bg-gray-200 my-4"></div>
            <ul className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us Skeleton */}
          <div className="bg-white py-6">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="w-12 h-1 bg-gray-200 my-4"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start p-4 border border-gray-200 rounded-lg">
                  <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Skeleton */}
          <div className="bg-white py-6">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="w-12 h-1 bg-gray-200 my-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-gray-200 pb-4">
                  <div className="h-5 w-full bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                </div>
              ))}
              <div className="h-12 w-full bg-gray-200 rounded-lg mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsSkeleton;