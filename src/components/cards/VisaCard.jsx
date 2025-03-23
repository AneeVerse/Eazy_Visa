// src/components/VisaCard.tsx
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Image from "next/image";

export default function VisaCard({
  name,
  price,
  visaType,
  image,
  visasOnTime,
  isTrending,
}) {
  return (
    <div
    

     className="bg-white hover-myshadow rounded-xl cursor-pointer min-w-64 w-64 relative border border-gray-200">
      {isTrending && (
        <div className="absolute z-10 -top-3 right-3 bg-gray-50 border border-gray-200 flex items-center text-secondary-500 px-[10px] h-[30px] gap-[5px] rounded-lg">
          <Image
            src={"/images/icon/cherry-blossom.png"}
            width={13}
            height={13}
            alt="trending imamge"
            className="self-center"
          />{" "}
          <span className="font-bold text-xs">Trending</span>
        </div>
      )}
      <div className="relative rounded-xl">
        <Image
          src={image}
          alt={name}
          width={256}
          height={160}
          className="w-full h-52 object-cover  rounded-t-xl"
        />
        <span className="absolute top-3 left-0 bg-primary-500 text-white text-xs px-3 py-[6px] rounded-r-lg">
          {visasOnTime} Visas on Time
        </span>
        <div className="flex absolute bottom-0 w-full justify-center ">
          <div className=" font-semibold  inline-flex pt-1 items-center gap-[5px] bg-white rounded-t-2xl px-3 h-[35px]">
            <IoMdCheckmarkCircleOutline className="text-lg text-gray-500 self-center" />{" "}
            <span className="text-secondary-500 text-md">{visaType}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-700 font-bold">{price}</p>
      </div>
    </div>
  );
}
