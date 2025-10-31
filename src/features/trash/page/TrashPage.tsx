import { useMemo, useState } from "react";
import { ActionBar } from "@/components/common/ActionBar";
import { ActionBarItems } from "../constants/ActionBarItems";
import { useModal } from "@/hooks/useModal";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import { TrashItemList } from "../components/TrashItemList";
import { SummaryText } from "@/components/common/SummaryText";
import { Checkbox } from "@/components/ui/Checkbox";
import { useSelection } from "@/hooks/useSelection";
import type { TcList } from "@/types/testcase";
import { usePagination } from "@/hooks/usePagination.ts";
import { NotData } from "@/components/common/NotData.tsx";
import { useTcTrash } from "@/hooks/useTcTrash";
import { updateItems } from "@/utils/updateItems";
import { tcListItems } from "@/features/tcList/contants/tcListItems";

function TrashPage() {
  const [items, setItems] = useState<TcList[]>(tcListItems.filter((i) => i.isTrashed));

  const { isOpen, onOpen, onClose } = useModal();
  const checkedLen = items.filter((item) => item.checked).length;
  const { currentPage, totalPages, handlePageChange, range, listRef } = usePagination(items.length);

  const paginatedItems = useMemo(() => {
    return items.slice(range.start, range.end);
  }, [items, range]);

  const updateTrash = updateItems(setItems);

  // checkbox control
  const { checkedAll, toggleCheckedAll, toggleChecked, clearSelection } = useSelection(
    paginatedItems,
    updateTrash,
  );
  const selectedIds = paginatedItems.filter((item) => item.checked).map((i) => i.tcSeq);

  // 복구 기능
  const { handleRestore } = useTcTrash(selectedIds, updateTrash);

  const handleTrashRestore = () => {
    handleRestore();
    onClose();
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      {paginatedItems.length > 0 ? (
        <>
          <div className="flex gap-4 p-[14px]">
            <Checkbox checked={checkedAll} setChecked={toggleCheckedAll} />
            <SummaryText tcLen={items.length} canDark={true} />
          </div>
          <div
            ref={listRef}
            className="scroll mb-7 flex h-full flex-1 flex-col gap-4 overflow-y-auto"
          >
            {paginatedItems.map((item) => (
              <TrashItemList key={item.tcSeq} item={item} handleCheckbox={toggleChecked} />
            ))}
          </div>
        </>
      ) : (
        <NotData label="삭제" />
      )}

      <ActionBar
        checkedLen={checkedLen}
        menus={ActionBarItems({
          onRestore: onOpen,
        })}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        clearSelection={clearSelection}
      />

      {isOpen && (
        <ConfirmModal
          title="복원하기"
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleTrashRestore}
        >
          복원하시겠어요?
          <br />
          복원된 TC는 Testcase 리스트에서 볼 수 있어요.
        </ConfirmModal>
      )}
    </div>
  );
}

export default TrashPage;
