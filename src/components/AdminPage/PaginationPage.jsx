import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationPage({ page = 1, count = 1, onChange }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= count && newPage !== page) {
      if (onChange) onChange(null, newPage);
    }
  };

  // Calculate dynamic 3 visible page buttons centered around current page
  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(count, startPage + 2);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    if (i >= 1 && i <= count) {
      visiblePages.push(i);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Previous Arrow Button */}
      <button
        type="button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Dynamic Visible Page Numbers (Max 3) */}
      {visiblePages.map((pageNum) => (
        <button
          key={pageNum}
          type="button"
          onClick={() => handlePageChange(pageNum)}
          className={`min-w-[36px] h-9 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            pageNum === page
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Next Arrow Button */}
      <button
        type="button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= count}
        className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}