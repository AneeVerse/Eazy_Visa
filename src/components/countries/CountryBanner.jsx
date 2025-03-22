import Image from "next/image";

export default function CountryBanner({ image, title }) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] xl:h-[600px] flex items-center justify-center text-center">
      {/* Background Image */}
      <Image 
        src={image} 
        alt={title} 
        layout="fill" 
        objectFit="cover" 
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Content */}
      <h1 className="relative text-white text-3xl  md:text-5xl font-bold leading-tight px-4">
        {title}
      </h1>
    </div>
  );
}
