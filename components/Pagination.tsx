import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-6">
      <button
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Poprzednia
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${page === currentPage ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Następna
      </button>
    </nav>
  );
};

export default Pagination; 