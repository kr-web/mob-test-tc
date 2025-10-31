import { TcTable } from "../table/TcTable";
import { TableHeader } from "@/features/tcEdit/components/table/TableHeader";
import { ActionBar } from "../ActionBar";
import { FloatingGuide } from "@/features/tcEdit/components/sidePanel/FloatingGuide";
import { SummaryText } from "../SummaryText";
import { ActionBarItems } from "@/features/tcEdit/constants/ActionBarItems";
import type { Pagination } from "@/types/Pagination";
import { TableColGroup } from "@/components/common/table/TableColGroupNoChk";
import { TableReadonlyRow } from "@/components/common/table/TableReadonlyRow";
import type { TcDetail } from "@/types/testcase";

interface TcItemViewProps {
  tcDetailLen: number;
  pagination: Pagination;
  tcDetail: TcDetail[];
  sortAsc: boolean;
  handleSort: (updater: (prev: boolean) => boolean) => void;
  sidePanel: {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
  };
}

export const TcDetailView = ({
  tcDetailLen,
  pagination,
  tcDetail,
  sortAsc,
  handleSort,
  sidePanel,
}: TcItemViewProps) => {
  const { currentPage, totalPages, handlePageChange, listRef } = pagination;
  return (
    <>
      <div className="mb-3 flex min-h-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 shadow-soft">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-r-lg rounded-t-[9px] bg-primary-gray">
          <div className="flex items-center justify-between px-4 py-3">
            <SummaryText tcLen={tcDetailLen} />
          </div>

          <div className="min-h-0 flex-1" ref={listRef}>
            <TcTable
              tcDetailList={tcDetail}
              tableColGroup={<TableColGroup />}
              tableHeader={<TableHeader sortAsc={sortAsc} handleSort={handleSort} />}
              renderRow={(row) => <TableReadonlyRow key={row.tcSeq} tcRow={row} />}
              className="pb-20"
            />
          </div>
        </div>
      </div>

      <ActionBar
        menus={ActionBarItems({
          onRegen: () => {},
          onDelete: () => {},
        })}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <FloatingGuide
        isSidePanelOpen={sidePanel.isOpen}
        onToggle={sidePanel.onToggle}
        onClose={sidePanel.onClose}
      />
    </>
  );
};
