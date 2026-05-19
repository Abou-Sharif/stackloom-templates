import { useEffect, useMemo, useState } from "react";

/**
 * Client-side pagination for tables and record lists.
 * @param {Array} items
 * @param {{ pageSize?: number, initialPage?: number }} [options]
 */
export function usePagination(items = [], { pageSize: initialPageSize = 10, initialPage = 1 } = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(Math.max(1, initialPageSize));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = (next) => {
    setPage(Math.min(Math.max(1, next), totalPages));
  };

  const setPageSize = (size) => {
    setPageSizeState(Math.max(1, size));
    setPage(1);
  };

  return {
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
    pageItems,
    goToPage,
    setPage,
    setPageSize,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    rangeStart: totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1,
    rangeEnd: Math.min(currentPage * pageSize, totalItems),
  };
}
