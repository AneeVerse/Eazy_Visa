// src/components/Pagination.tsx

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

  
  export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-[50px] h-[50px] flex justify-center border-gray-500 items-center border rounded-md bg-gray-200 disabled:opacity-50"
        >
          <FaAngleLeft />
        </button>
  
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-[50px] h-[50px] border rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white border-blue-500" : "bg-gray-200 border-gray-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-[50px] h-[50px] flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 disabled:opacity-50"
        >
            <FaAngleRight />
        </button>
      </div>
    );
  }
  