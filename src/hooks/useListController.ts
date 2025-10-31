import type { SortOrder } from "@/components/ui/sort/sortItem";
import { useEffect, useMemo } from "react";
import { usePagination } from "./usePagination";

interface ItemBase {
  tcSeq: number;
  name?: string;
  pinned?: boolean;
}

interface ListControllerOptions {
  searchQuery?: string;
  sortOrder?: SortOrder;
  enablePin?: boolean;
}

export const useListController = <T extends ItemBase>(
  items: T[],
  { searchQuery, sortOrder, enablePin = false }: ListControllerOptions = {},
) => {
  // 검색 + 정렬 + pin
  const filteredItems = useMemo(() => {
    if (!sortOrder && !searchQuery) return items;

    // 검색
    const query = (searchQuery ?? "").trim().toLowerCase();
    const queryList = query
      ? items.filter((item) => (item.name ?? "").toLowerCase().includes(query))
      : items;

    // pin
    if (enablePin) {
      const pinned = queryList.filter((i) => i.pinned);
      const unpinned = queryList.filter((i) => !i.pinned);

      if (sortOrder) {
        unpinned.sort((a, b) => (sortOrder === "latest" ? b.tcSeq - a.tcSeq : a.tcSeq - b.tcSeq));
      }

      return [...pinned, ...unpinned];
    }

    // 정렬
    const sortList = sortOrder
      ? [...queryList].sort((a, b) =>
          sortOrder === "latest" ? b.tcSeq - a.tcSeq : a.tcSeq - b.tcSeq,
        )
      : queryList;

    return sortList;
  }, [items, searchQuery, sortOrder]);

  // pagination
  const { currentPage, totalPages, handlePageChange, range, listRef } = usePagination(
    filteredItems.length,
  );

  // 페이지에 보여지는 list
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(range.start, range.end);
  }, [filteredItems, range]);

  // 검색된 목록의 개수
  const filteredItemCnt = filteredItems.length;

  useEffect(() => {
    handlePageChange(1);
  }, [searchQuery]);

  return {
    filteredItemCnt,
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
    listRef,
    range,
  };
};
