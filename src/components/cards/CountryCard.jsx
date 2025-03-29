// src/components/VisaCard.tsx
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

export default function CountryCard({
  name,
  price,
  continent,
  visaType,
  image,
  visasOnTime,
  isTrending,
}) {
  return (
    <Link href={`/countries/${continent.toLowerCase()}/${name.toLowerCase()}`}
    

     className="bg-white hover-myshadow rounded-xl cursor-pointer relative border border-gray-200">
      {isTrending && (
        <div className="absolute z-10 -top-3 right-3 bg-gray-50 border border-gray-200 flex items-center text-secondary-500 px-[10px] h-[30px] gap-[5px] rounded-lg">
          <Image
            src={"/images/icon/cherry-blossom.png"}
            width={13}
            height={13}
            alt="trending imamge"
            className="self-center"
          />{" "}
          <span className="font-bold text-[11px] sm:text-xs">Trending</span>
        </div>
      )}
      <div className="relative rounded-xl">
        <Image
          src={image}
          alt={name}
          width={256}
          height={160}
          className="w-full h-[200px] sm:h-[250px] lg:h-[270px] object-cover  rounded-t-xl"
        />
        <span className="absolute top-8 left-0 bg-[#5554e7] text-white text-[11px] sm:text-xs px-3 py-[6px] rounded-r-lg">
          {visasOnTime} Visas on Time
        </span>
        <div className="flex absolute bottom-0 w-full justify-center ">
          <div className=" font-semibold  inline-flex pt-1 items-center gap-[5px] bg-white rounded-t-2xl px-3 h-[35px]">
            <IoMdCheckmarkCircleOutline className="text-lg text-gray-500 self-center" />{" "}
            <span className="text-secondary-500 text-sm sm:text-md">{visaType}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-sm sm:text-lg font-semibold">{name}</h3>
        <p className="text-gray-700 text-sm sm:text-lg font-bold">{price}</p>
      </div>
    </Link>
  );
}