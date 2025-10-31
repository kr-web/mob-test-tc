import { useEffect, useMemo, useRef, useState } from "react";

export const usePagination = (totalItems: number, pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / pageSize);
  const listRef = useRef<HTMLDivElement | null>(null);

  // 검색으로 전체 개수 변경시 현재 페이지 조정
  useEffect(() => {
    totalItems === 0 ? setCurrentPage(0) : setCurrentPage(1);
  }, [totalItems]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 페이지 바뀌면 스크롤 맨 위로
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const range = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    return { start, end };
  }, [currentPage, pageSize, totalItems]);

  return {
    currentPage,
    totalPages,
    handlePageChange,
    range,
    listRef,
  };
};
