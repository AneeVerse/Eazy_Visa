import Image from "next/image";
import { Heading } from "../common/Typography";

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
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text Content */}
      <Heading level={1} weight="bold" className="text-white max-w-[1440px] md:leading-14 mx-auto relative z-10">
        {title}
      </Heading>
    </div>
  );
}
