import { ActionBar } from "@/components/common/ActionBar";
import { SummaryCard } from "../components/card/SummaryCard";
import { getSummaryItems } from "../constants/getSummaryItems";
import { TcEditToolbar } from "../components/TcEditToolbar";
import { useEffect, useMemo, useState } from "react";
import { FloatingGuide } from "../components/sidePanel/FloatingGuide";
import { ActionBarItems } from "../constants/ActionBarItems";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import { useModal } from "@/hooks/useModal";
import { NoRecModal } from "../components/modal/NoRecModal";
import { PreviewModal } from "../components/modal/PreviewModal";
import { useSelection } from "@/hooks/useSelection";
import { TcTable } from "@/components/common/table/TcTable";
import { TableRow } from "../components/table/TableRow";
import { TableColGroup } from "../components/table/TableColGroup";
import { TableHeader } from "../components/table/TableHeader";
import { usePagination } from "@/hooks/usePagination.ts";
import type { TcDetail, TcSummary } from "@/types/testcase";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MenuButtonItems } from "../constants/MenuButtonItems";
import { TcDetailViewHeader } from "@/components/common/tcItemView/TcDetailViewHeader";

function TcEditPage() {
  const { tcSeq } = useParams<{ tcSeq: string }>();
  const queryClient = useQueryClient();

  const cachedTcData = queryClient.getQueryData<{ summary: TcSummary; list: TcDetail[] }>([
    "tcDetail",
    Number(tcSeq),
  ]);
  console.log(cachedTcData);

  const tcSummary = cachedTcData?.summary ?? { creationTime: "", qltyIndex: "", trust: "" };
  const tcList = cachedTcData?.list ?? [];

  const summaryItems = useMemo(() => getSummaryItems(tcSummary), [tcSummary]);

  const [tcDetailList, setTcDetailList] = useState<TcDetail[]>([]);

  useEffect(() => {
    if (tcList) {
      const listWithCheck = tcList.map((i: TcDetail) => ({ ...i, checked: false }));
      setTcDetailList(listWithCheck);
    }
  }, [tcList]);

  const tcLen = tcDetailList.length;

  const { currentPage, totalPages, handlePageChange, range, listRef } = usePagination(
    tcDetailList.length,
  );

  const paginatedItems = useMemo(() => {
    return tcDetailList.slice(range.start, range.end);
  }, [tcDetailList, range]);

  const { checkedAll, toggleCheckedAll, toggleChecked, clearSelection } = useSelection(
    paginatedItems,
    setTcDetailList,
  );
  const checkedLen = tcDetailList.filter((list) => list.checked).length;

  const handleRegen = () => {
    console.log("재생성 기능 실행");
  };

  const handleDelete = () => {
    console.log("삭제 기능 실행");
  };

  const regenModal = useModal();
  const noRecModal = useModal();
  const tcListModal = useModal();
  const previewModal = useModal();
  const deleteModal = useModal();
  const sidePanel = useModal();
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (updater: (prev: boolean) => boolean) => {
    setSortAsc(updater);
  };

  const menuButtons = MenuButtonItems({
    onPreview: previewModal.onOpen,
    onDelete: deleteModal.onOpen,
  });

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-primary-gray px-5">
      <TcDetailViewHeader tcListModal={tcListModal} menuButtons={menuButtons} canEdit={true} />

      <div className="flex flex-col">
        <div className="grid min-h-[107px] grid-cols-3 gap-3 pb-4">
          {summaryItems.map((item) => (
            <SummaryCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className="mb-3 flex min-h-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 shadow-soft">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-r-lg rounded-t-[9px] bg-primary-gray">
          <TcEditToolbar
            openRegen={regenModal.onOpen}
            openNoRec={noRecModal.onOpen}
            tcLen={tcLen}
          />

          <div className="min-h-0 flex-1" ref={listRef}>
            <TcTable
              tcDetailList={paginatedItems}
              tableColGroup={<TableColGroup />}
              tableHeader={
                <TableHeader
                  checkedAll={checkedAll}
                  toggleCheckedAll={toggleCheckedAll}
                  sortAsc={sortAsc}
                  handleSort={handleSort}
                />
              }
              renderRow={(row) => (
                <TableRow key={row.tcSeq} tcRow={row} toggleChecked={toggleChecked} />
              )}
              className="pb-20"
            />
          </div>
        </div>
      </div>

      <ActionBar
        checkedLen={checkedLen}
        menus={ActionBarItems({
          onRegen: handleRegen,
          onDelete: handleDelete,
        })}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        clearSelection={clearSelection}
      />

      <FloatingGuide
        isSidePanelOpen={sidePanel.isOpen}
        onToggle={sidePanel.onToggle}
        onClose={sidePanel.onClose}
      />

      {regenModal.isOpen && (
        <ConfirmModal
          isOpen={regenModal.isOpen}
          onClose={regenModal.onClose}
          title="전체 재생성"
          btnNm="재생성하기"
          children={`재생성시, 새로운 파일로 추가 생성됩니다.
          재생성할까요?
        `}
        />
      )}

      {noRecModal.isOpen && <NoRecModal isOpen={noRecModal.isOpen} onClose={noRecModal.onClose} />}

      {deleteModal.isOpen && (
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
          title="삭제"
          btnNm="삭제하기"
          children={`삭제하시겠어요?
            삭제한 TC는 휴지통에서 볼 수 있어요.
        `}
        />
      )}

      {previewModal.isOpen && (
        <PreviewModal isOpen={previewModal.isOpen} onClose={previewModal.onClose} />
      )}
    </div>
  );
}

export default TcEditPage;
