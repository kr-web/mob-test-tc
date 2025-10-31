import { useEffect, useState } from 'react';

export const useCheckedAll = <T extends { checked: boolean }>(items: T[]) => {
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const toggleCheckedAll = () => {
    console.log('눌렀다!!');
    setCheckedAll((prev) => !prev);
  };

  useEffect(() => {
    console.log(checkedAll);
  }, [checkedAll]);

  // 모든 항목이 체크되어 있으면 checkedAll = true
  useEffect(() => {
    const allChecked = items.length > 0 && items.every((item) => item.checked);
    setCheckedAll(allChecked);
  }, [items]);

  return { checkedAll, toggleCheckedAll };
};
