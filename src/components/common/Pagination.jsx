// src/components/Pagination.tsx

import { FaAngleLeft, FaAngleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

  
  export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-[50px] h-[50px] flex justify-center border-gray-500 items-center border cursor-pointer rounded-md  disabled:opacity-50"
        >
          <FaChevronLeft  className="text-lg" />
        </button>
  
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-[50px] h-[50px] border cursor-pointer rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white border-blue-500" : " border-gray-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-[50px] h-[50px] flex justify-center items-center border border-gray-500 rounded-md cursor-pointer  disabled:opacity-50"
        >
            <FaChevronRight className="text-lg" />
        </button>
      </div>
    );
  }
  