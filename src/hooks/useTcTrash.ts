import type { TcList } from "@/types/testcase";

export const useTcTrash = (
  selectedIds: number[],
  updateItems: (updater: (prev: TcList[]) => TcList[]) => void,
) => {
  console.log(selectedIds);
  // 복원
  const handleRestore = () => {


    updateItems((prev) =>
      prev.map((item) => (selectedIds.includes(item.tcSeq) ? { ...item, isTrashed: false } : item)),
    );
  };

  return { handleRestore };
};
