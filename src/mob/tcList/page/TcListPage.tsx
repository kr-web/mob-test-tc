import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { ListSearch } from "@/components/ui/search/ListSearch";
import { ActionCard } from "@/mob/tcList/components/card/ActionCard";
import { TcItemList } from "@/mob/tcList/components/list/TcItemList.tsx";
import { Toast } from "@/components/toast/Toast";
import { useToast } from "@/hooks/useToast";
import { NotData } from "@/components/common/NotData";

// @ts-ignore
import EmptyIcon from "@/assets/icons/actionBar/close.svg?react-no-replace";
import type { TcList } from "@/types/testcase";
import { useListController } from "@/hooks/useListController.ts";
import { useListState } from "@/hooks/useListState.ts";
import { SummaryText } from "@/components/common/SummaryText.tsx";
import { SortSelect } from "@/components/ui/sort/SortSelect.tsx";
import { Pagination } from "@/components/ui/pagintaion/Pagination.tsx";

interface OutletContextType {
  setTitle: (t: string) => void;
}

function TcListPage() {
  // =========================================================================================
  // ⚡ 더미 데이터 생성 (추후 삭제) --------------------------------------------------------------
  const [items] = useState<TcList[]>(
    Array.from({ length: 53 }, (_, i) => ({
      id: i + 1,
      name: `AD-로그인-${String(i + 1).padStart(3, "0")}_로그인테스트케이스_${String(i + 1)}`,
      date: `2025.09.18 AM 09:24:${String(i + 1).padStart(2, "0")}`,
      url: "copy",
      pinned: false,
      checked: false,
    })),
  );

  // 상태관리 ----------------------------------------------------------------------------------
  const { toastState, toastOpen, toastClose } = useToast();
  const { setTitle } = useOutletContext<OutletContextType>();
  const { searchQuery, setSearchQuery, sortOrder, setSortOrder } = useListState();
  const {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
    range,
    listRef,
    filteredItemCnt,
  } = useListController<TcList>(items, { searchQuery, sortOrder });
  // 상단 제목 세팅 -----------------------------------------------------------------------------
  useEffect(() => {
    setTitle("Testcase");
  }, []);

  // 검색 기능 + 검색 후 선택 초기화 ---------------------------------------------------------------
  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  // 페이지 이동 시 선택 초기화 --------------------------------------------------------------------
  const resetPage = (page: number) => {
    handlePageChange(page);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* 액션 카드 */}
      <ActionCard />

      {/* 검색 */}
      <ListSearch searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />

      {/* 툴바 */}
      <div className="flex w-full items-center justify-between">
        <SummaryText tcLen={filteredItemCnt} />
        <SortSelect sortOrder={sortOrder} handleSortOrder={setSortOrder} />
      </div>

      {/* 리스트 */}
      {paginatedItems.length > 0 ? (
        <div ref={listRef} className="scroll flex w-full flex-col gap-4 overflow-y-auto">
          {paginatedItems.map((item, index) => {
            const globalIndex = range.start + index;
            const isFifthItem = (globalIndex + 1) % 10 === 0;
            const isLast = globalIndex === items.length - 1;
            const addPadding = isFifthItem || isLast;

            return (
              <div key={item.id} className={addPadding ? "pb-20" : ""}>
                <TcItemList item={item} toastOpen={toastOpen} />
              </div>
            );
          })}
        </div>
      ) : (
        <NotData label="작성" />
      )}

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={resetPage} />

      {/* 토스트 */}
      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />
    </>
  );
}

export default TcListPage;
