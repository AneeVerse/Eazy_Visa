"use client"

export default function Layout  ({ children, className = "" }) {
  return (
    <div className={`max-w-[1440px] mx-auto px-sm md:px-md lg:px-[50px] lg:mx-[20px] xl:mx-[50px]  2xl:mx-auto ${className}`}>

      {children}
    </div>
  );
}