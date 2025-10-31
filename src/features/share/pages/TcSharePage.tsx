import { TcDetailView } from "@/components/common/tcItemView/TcDetailView";
import { TcDetailViewHeader } from "@/components/common/tcItemView/TcDetailViewHeader";
import Edit from "@/assets/icons/common/edit.svg?react";
import { tcListEx } from "@/features/tcEdit/constants/tcListEx";
import type { TcDetail } from "@/types/testcase";
import { useMemo, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";
import { TcDetailSummaryCard } from "@/components/common/tcItemView/TcDetailSummaryCard";
import { getSummaryItems } from "@/features/tcEdit/constants/getSummaryItems";

export const TcSharePage = () => {
  const [tcDetailList, setTcDetailList] = useState<TcDetail[]>(tcListEx);
  const [sortAsc, setSortAsc] = useState(true);

  const tcDetailLen = tcDetailList.length;

  // setSortAsc
  const handleSort = (updater: (prev: boolean) => boolean) => {
    setSortAsc(updater);
  };

  // modal control
  const tcListModal = useModal();
  const sidePanel = useModal();

  // pagination
  const pagination = usePagination(tcDetailList.length);
  const range = pagination.range;

  const paginatedItems = useMemo(() => {
    return tcDetailList.slice(range.start, range.end);
  }, [tcDetailList, range]);

  // tc 생성시간, 품질지수, 신뢰도
  const tcSummary = { creationTime: "33.0", qltyIndex: "3.0", trust: "3.5" };
  const summaryItems = useMemo(() => getSummaryItems(tcSummary), [tcSummary]);

  // 내 tc로 가져오기
  // const cloneFromUser = () => {};
  const actionButton = [{ icon: Edit, label: "편집하기" }];

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-primary-gray px-5">
      <TcDetailViewHeader tcListModal={tcListModal} menuButtons={actionButton} />

      <TcDetailSummaryCard summaryItems={summaryItems} />

      <TcDetailView
        tcDetailLen={tcDetailLen}
        pagination={pagination}
        tcDetail={paginatedItems}
        sortAsc={sortAsc}
        handleSort={handleSort}
        sidePanel={sidePanel}
      />
    </div>
  );
};
