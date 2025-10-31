import type { MutableRefObject } from "react";

export interface Pagination {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  range: { start: number; end: number };
  listRef: MutableRefObject<HTMLDivElement | null>;
}
