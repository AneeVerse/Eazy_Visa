// src/components/VisaCardSkeleton.tsx
export default function CountryCardSkeleton({isWidthFull = false}) {
  return (
    <div className={`bg-white  ${isWidthFull ? " w-full " : " min-w-64 w-64 " } relative  rounded-xl border border-gray-200 overflow-hidden`}>
      {/* Trending badge skeleton - only appears sometimes */}
      <div className="absolute z-10 -top-3 right-3 bg-gray-100 h-7 w-24 rounded-lg animate-pulse"></div>
      
      {/* Image placeholder */}
      <div className="relative">
        <div className="w-full h-[200px] sm:h-[250px] lg:h-[270px] bg-gray-100 animate-pulse"></div>
        
        {/* Visas on time badge */}
        <div className="absolute top-8 left-0 bg-gray-200 h-6 w-28 rounded-r-lg animate-pulse"></div>
        
        {/* Visa type indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white h-9 w-28 rounded-t-xl flex justify-center pt-1">
          <div className="bg-gray-100 h-5 w-20 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Bottom content */}
      <div className="p-4 flex justify-between items-center">
        <div className="bg-gray-100 h-5 w-3/5 rounded animate-pulse"></div>
        <div className="bg-gray-100 h-5 w-1/5 rounded animate-pulse"></div>
      </div>
    </div>
  );
}