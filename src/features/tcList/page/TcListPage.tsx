import { useState } from "react";
import { ActionCard } from "../components/cards/ActionCard";
import { generateBoxes } from "../contants/generateBoxes";
import { TcItemList } from "../components/list/TcItemList";
import { TcListToolbar } from "../components/toolbar/TcListToolbar";
import { TcItemGrid } from "../components/list/TcItemGrid";
import { ActionBar } from "@/components/common/ActionBar";
import { ActionBarItems } from "../contants/ActionBarItems";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import { useModal } from "@/hooks/useModal";
import { useSelection } from "@/hooks/useSelection";
import { NotData } from "@/components/common/NotData";

import type { TcList } from "@/types/testcase";
import { useListController } from "@/hooks/useListController";
import { useListState } from "@/hooks/useListState";
import { tcListItems } from "../contants/tcListItems";

function TcListPage() {
  const [items, setItems] = useState<TcList[]>(tcListItems);

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const checkedLen = items.filter((item) => item.checked).length;
  const { isOpen, onOpen, onClose } = useModal();

  const { searchQuery, setSearchQuery, sortOrder, setSortOrder } = useListState();
  const enablePin = true;
  const { paginatedItems, currentPage, totalPages, handlePageChange, listRef, filteredItemCnt } =
    useListController<TcList>(items, { searchQuery, sortOrder, enablePin });

  // pin 기능
  const handlePin = (tcSeq: number) => {
    setItems((prev) =>
      prev.map((item) => (item.tcSeq === tcSeq ? { ...item, pinned: !item.pinned } : item)),
    );
  };

  const { checkedAll, toggleCheckedAll, toggleChecked, clearSelection } = useSelection(
    paginatedItems,
    setItems,
  );

  const selectedItems = paginatedItems.filter((item) => item.checked);

  // tc 복제
  const handleCopy = () => {
    // selectedItems.map((item) => {
    //   const { id, createdAt };
    //   const duplicated = { ...rest };
    // });
    // const duplicated = {
    //   ...resizeTo,
    //   name: `${Target.name}`,
    // };
    // db야 돌아라~
    // insertItem
    const goToPage = sortOrder === "latest" ? 1 : totalPages;
    handlePageChange(goToPage);
  };

  // tc 삭제
  const handleDelete = () => {
    // db야 돌아라~
    // deleteItem(selectedItems.map(i => i.id))
  };

  // 검색 기능 + 검색 후 선택 초기화
  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
    clearSelection();
  };

  // 페이지 이동 시 선택 초기화
  const resetPage = (page: number) => {
    clearSelection();
    handlePageChange(page);
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="mb-7 grid grid-cols-2 gap-3">
        {generateBoxes.map((box) => (
          <ActionCard key={box.title} item={box} />
        ))}
      </div>

      <TcListToolbar
        sortOrder={sortOrder}
        searchQuery={searchQuery}
        handleSortOrder={setSortOrder}
        handleSearchQuery={handleSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        tcLen={filteredItemCnt}
        checkedAll={checkedAll}
        toggleCheckedAll={toggleCheckedAll}
      />

      {paginatedItems.length > 0 ? (
        <div ref={listRef} className="scroll mb-7 mt-3 flex-1 overflow-y-auto pb-20 pr-1">
          {viewMode === "list" ? (
            <div className="flex flex-col gap-[5px]">
              {paginatedItems.map((item) => (
                <TcItemList
                  key={item.tcSeq}
                  item={item}
                  handleCheckbox={toggleChecked}
                  isPin={true}
                  handlePin={handlePin}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {paginatedItems.map((item) => (
                <TcItemGrid
                  key={item.tcSeq}
                  item={item}
                  handleCheckbox={toggleChecked}
                  handlePin={handlePin}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <NotData label="작성" />
      )}

      <ActionBar
        checkedLen={checkedLen}
        menus={ActionBarItems({
          onMerge: onOpen,
          onCopy: handleCopy,
          onDelete: handleDelete,
        })}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={resetPage}
        clearSelection={clearSelection}
      />

      {/* {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          title="TC통합"
          btnNm="통합하기"
          children={`
          통합된 새로운 TC로 복사돼요
          통합하시겠어요?
        `}
        />
      )}

      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          title="복원하기"
          children={`
          복원하시겠어요?
          복원된 TC는 Testcase 리스트에서 볼 수 있어요. 
        `}
        />
      )} */}

      {isOpen && (
        <ConfirmModal isOpen={isOpen} onClose={onClose} title="영구삭제" isDelete={true}>
          <>
            삭제하시겠어요?{"\n"}
            영구 삭제된 TC는 복원할 수 없어요.{"\n"}
            <span className="text-status-false">이 작업은 취소할 수 없어요!</span>
          </>
        </ConfirmModal>
      )}
    </div>
  );
}

export default TcListPage;
