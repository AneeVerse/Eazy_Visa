"use client";
import { usePathname } from 'next/navigation';
import NextTopLoader from "nextjs-toploader";

const ConditionalTopLoader = () => {
  const pathname = usePathname();
  
  // Hide top loader on dummy-flight/visa-ads page
  if (pathname === '/dummy-flight/visa-ads') {
    return null;
  }
  
  // Show top loader on all other pages
  return (
    <NextTopLoader
      color="#0B82E6"
      initialPosition={0.08}
      height={3}
      showSpinner={false}
      easing="ease"
      speed={500}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
    />
  );
};

export default ConditionalTopLoader; 