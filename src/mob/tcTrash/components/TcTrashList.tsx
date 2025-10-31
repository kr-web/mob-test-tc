import TimeIcon from "@/assets/icons/common/clock.svg?react-no-replace";
import FlashIcon from "@/assets/icons/tcList/item/flash.svg?react";
import TrashIcon from "@/assets/icons/common/trash.svg?react";

import type { TcList } from "@/types/testcase";

interface TcItemListProps {
  item: TcList;
  onOpen: () => void;
}

export const TcTrashList = ({ item, onOpen }: TcItemListProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-5">
      <p className="text-[14px] tracking-[-.28px] text-secondary-darkgray3">{item.name}</p>
      <div className="flex items-center gap-1 text-[12px] tracking-[-.24px] text-secondary-gray1">
        <TimeIcon className="h-4 w-4 text-secondary-gray1" /> {item.date}
      </div>
      <div className="flex justify-between gap-2">
        <button
          className="flex h-[42px] w-1/2 items-center justify-center gap-2 rounded-lg bg-primary-gray text-[14px] tracking-[-.28px] text-secondary-darkgray3"
          onClick={onOpen}
        >
          {/*onClick={() => handleRestore()}*/}
          <FlashIcon className="h-5 w-5 text-secondary-gray1" />
          복원하기
        </button>
        <button
          className="flex h-[42px] w-1/2 items-center justify-center gap-2 rounded-lg bg-primary-gray text-[14px] tracking-[-.28px] text-secondary-gray2"
          disabled
        >
          <TrashIcon className="h-5 w-5" />
          영구삭제
        </button>
      </div>
    </div>
  );
};
