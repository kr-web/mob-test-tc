import { useMemo } from "react";

export const useSelection = <T extends { tcSeq: number; checked: boolean }>(
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  const checkedAll = useMemo(
    () => items.length > 0 && items.every((item) => item.checked),
    [items],
  );

  const toggleChecked = (tcSeq: number) => {
    setItems((prev) => prev.map((i) => (i.tcSeq === tcSeq ? { ...i, checked: !i.checked } : i)));
  };

  // 전체 선택 / 해제
  const toggleCheckedAll = () => {
    if (!items.length) return;

    const next = !checkedAll;

    const targetIds = new Set(items.map((i) => i.tcSeq));

    setItems((prev) =>
      prev.map((item) => (targetIds.has(item.tcSeq) ? { ...item, checked: next } : item)),
    );
  };

  // 모든 선택 해제
  const clearSelection = () => {
    if (!items.length) return;
    setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  };

  return { checkedAll, toggleCheckedAll, toggleChecked, clearSelection };
};
