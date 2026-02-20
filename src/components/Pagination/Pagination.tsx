interface PaginationProps {
  totalCount: number;
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

function Pagination({
  totalCount,
  limit,
  offset,
  onPageChange,
}: PaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  const isPrevDisabled = offset === 0;
  const isNextDisabled = offset + limit >= totalCount;

  const handlePrev = () => {
    if (!isPrevDisabled) {
      onPageChange(offset - limit);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(offset + limit);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-gray-950 shadow transition hover:bg-amber-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-amber-400 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>

      <span className="text-sm text-gray-400 font-medium tabular-nums">
        Page <span className="text-white font-bold">{currentPage}</span> of{" "}
        <span className="text-white font-bold">{totalPages}</span>
      </span>

      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-gray-950 shadow transition hover:bg-amber-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-amber-400 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
