"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import FloatingActionButton from './FloatingActionButton';

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  if (isStudioRoute) {
    // Studio routes - no navbar, no floating action button, no margin
    return <>{children}</>;
  }

  // Regular routes - include navbar and floating action button
  return (
    <>
      <Navbar />
      <div className="mt-[80px]">
        {children}
        <FloatingActionButton />
      </div>
    </>
  );
};

export default ConditionalLayout; 