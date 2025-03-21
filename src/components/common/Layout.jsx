"use client"

export default function Layout  ({ children, className = "" }) {
  return (
    <div className={`max-w-[1440px] mx-auto px-[8px] md:px-[16px] lg:px-[50px] lg:mx-[20px] xl:mx-[50px]  2xl:mx-auto ${className}`}>

      {children}
    </div>
  );
}