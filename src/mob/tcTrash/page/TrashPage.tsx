import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { TcTrashList } from "@/mob/tcTrash/components/TcTrashList.tsx";
import { Pagination } from "@/components/ui/pagintaion/Pagination.tsx";
import { Toast } from "@/components/toast/Toast";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import { NotData } from "@/components/common/NotData";

// @ts-ignore
import EmptyIcon from "@/assets/icons/actionBar/close.svg?react-no-replace";

import type { TcList } from "@/types/testcase";
import { useModal } from "@/hooks/useModal.ts";
import { useListController } from "@/hooks/useListController.ts";
import { SummaryText } from "@/components/common/SummaryText.tsx";

interface OutletContextType {
  setTitle: (t: string) => void;
}

function TrashPage() {
  // =========================================================================================
  // ⚡ 더미 데이터 생성 (추후 삭제) --------------------------------------------------------------
  const [items, setItems] = useState<TcList[]>(
    Array.from({ length: 21 }, (_, i) => ({
      id: i + 1,
      name: `AD-로그인-${String(i + 1).padStart(3, "0")}_로그인테스트케이스_${String(i + 1)}`,
      date: "2025.09.18 AM 09:24:32",
      pinned: false,
      checked: false,
    })),
  );

  // 상태관리 ----------------------------------------------------------------------------------
  const { setTitle } = useOutletContext<OutletContextType>();
  const { isOpen, onOpen, onClose } = useModal();
  const [selectedItem, setSelectedItem] = useState<TcList | null>(null);
  const { toastState, toastOpen, toastClose } = useToast();
  const {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
    range,
    listRef,
    filteredItemCnt,
  } = useListController<TcList>(items);

  // 상단 제목 세팅 -----------------------------------------------------------------------------
  useEffect(() => {
    setTitle("Trash");
  }, []);

  // props -----------------------------------------------------------------------------------
  const handleItem = (item: TcList | null) => {
    setSelectedItem(item);
  };

  // ACTION 복원/영구삭제 -----------------------------------------------------------------------
  const confirmAction = () => {
    if (!selectedItem) return;

    // 리스트에서 제거
    setItems((prev) => prev.filter((item) => item.id !== selectedItem.id));

    // 토스트
    toastOpen("복원 완료", "복원된 TC는 Testcase 메뉴에서\n확인할 수 있어요", "Y");

    // 모달 닫기
    onClose();
    handleItem(null);
  };

  // 페이지 이동 시 선택 초기화 --------------------------------------------------------------------
  const resetPage = (page: number) => {
    handlePageChange(page);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* 툴바 */}
      <SummaryText tcLen={filteredItemCnt} />

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
                <TcTrashList
                  item={item}
                  onOpen={() => {
                    handleItem(item);
                    onOpen();
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <NotData label="삭제" />
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

      {/* Alert */}
      {isOpen && (
        <ConfirmModal isOpen={isOpen} onClose={onClose} onConfirm={confirmAction} title="복원하기">
          복원하시겠어요?
          <br />
          복원된 TC는 Testcase 리스트에서 볼 수 있어요.
        </ConfirmModal>
      )}
    </>
  );
}

export default TrashPage;
