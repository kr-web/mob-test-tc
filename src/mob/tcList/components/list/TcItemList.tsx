import { useNavigate } from "react-router-dom";
import { useShare } from "@/hooks/useShare";

import TimeIcon from "@/assets/icons/common/clock.svg?react-no-replace";
import FlashIcon from "@/assets/icons/tcList/item/flash.svg?react";
import ShareIcon from "@/assets/icons/tclist/item/clip.svg?react-no-replace";

interface TcItemListProps {
  item: {
    id: number;
    name: string;
    date: string;
    pinned?: boolean;
    checked: boolean;
  };
  toastOpen: (title: string, content: string, type: "Y" | "W" | "N") => void;
}

export const TcItemList = ({ item, toastOpen }: TcItemListProps) => {
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const navigate = useNavigate();
  // const url = item.url;
  const { shareAction } = useShare(item.name, toastOpen);

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-white p-5">
      <p className="text-[14px] tracking-[-.28px] text-secondary-darkgray3">{item.name}</p>
      <div className="flex items-center gap-1 text-[12px] tracking-[-.24px] text-secondary-gray1">
        <TimeIcon className="h-4 w-4" /> {item.date}
      </div>
      <div className="flex justify-between gap-2">
        <button
          className="flex h-[42px] w-1/2 items-center justify-center gap-2 rounded-lg bg-primary-gray text-[14px] tracking-[-.28px] text-secondary-darkgray3"
          onClick={() => navigate(`/view/${item.id}`)}
        >
          <FlashIcon className="h-5 w-5 text-secondary-gray2" />
          입장하기
        </button>
        <button
          className="flex h-[42px] w-1/2 items-center justify-center gap-2 rounded-lg bg-primary-gray text-[14px] tracking-[-.28px] text-secondary-darkgray3"
          onClick={shareAction}
        >
          <ShareIcon className="h-5 w-5 text-secondary-gray2" />
          공유하기
        </button>
      </div>
    </div>
  );
};
