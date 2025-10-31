import { TcDetailViewHeader } from "@/components/common/tcItemView/TcDetailViewHeader";
import { BackButton } from "@/components/ui/button/BackButton";
import { tcListEx } from "@/features/tcEdit/constants/tcListEx";
import { tcListItems } from "@/features/tcList/contants/tcListItems";
import { useModal } from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";
import { useTcTrash } from "@/hooks/useTcTrash";
import type { TcDetail, TcList } from "@/types/testcase";
import { updateItems } from "@/utils/updateItems";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "@/assets/icons/common/edit.svg?react";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { TcDetailView } from "@/components/common/tcItemView/TcDetailView";
import { getSummaryItems } from "@/features/tcEdit/constants/getSummaryItems";
import { TcDetailSummaryCard } from "@/components/common/tcItemView/TcDetailSummaryCard";

export const TrashDetailPage = () => {
  const navigate = useNavigate();
  const { tcSeq } = useParams();
  const [tcDetail] = useState<TcDetail[]>(tcListEx);
  const [trashList, setTrashList] = useState<TcList[]>(
    tcListItems.filter((i) => i.tcSeq === Number(tcSeq)),
  );

  if (trashList.length === 0 || !trashList[0].isTrashed) return <NotFoundPage />;

  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (updater: (prev: boolean) => boolean) => {
    setSortAsc(updater);
  };

  // modal control
  const sidePanel = useModal();

  // pagination
  const pagination = usePagination(tcDetail.length);
  const range = pagination.range;

  const paginatedItems = useMemo(() => {
    return tcDetail.slice(range.start, range.end);
  }, [tcDetail, range]);

  const tcDetailLen = tcDetail.length;

  const updateTrash = updateItems(setTrashList);

  // 복원하기
  const { handleRestore } = useTcTrash([Number(tcSeq)], updateTrash);
  const handleTrashRestore = () => {
    handleRestore();
    navigate("/trash");
  };

  const actionButton = [{ icon: Edit, label: "복원하기", onClick: handleTrashRestore }];

  const tcSummary = { creationTime: "33.0", qltyIndex: "3.0", trust: "3.5" };
  const summaryItems = useMemo(() => getSummaryItems(tcSummary), [tcSummary]);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-primary-gray px-5">
      <TcDetailViewHeader menuButtons={actionButton}>
        <BackButton size="size-9" onClick={() => navigate("/trash")} />
      </TcDetailViewHeader>

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
