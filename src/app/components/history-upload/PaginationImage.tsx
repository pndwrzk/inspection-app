import React from "react";

interface PaginationProps {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPage, setPage }) => {
  if (totalPage <= 1) return null;

  return (
    <div className="w-full flex items-center justify-center py-6">
      <nav className="inline-flex items-center p-1 rounded bg-white space-x-2">
        <button
          className="p-1 rounded border text-white bg-gray-800 hover:bg-black cursor-pointer"
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page <= 1}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
        <p className="text-gray-500">
          Page {page} of {totalPage}
        </p>
        <button
          className="p-1 rounded border text-white bg-gray-800 hover:bg-black cursor-pointer"
          onClick={() => page < totalPage && setPage(page + 1)}
          disabled={page >= totalPage}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
