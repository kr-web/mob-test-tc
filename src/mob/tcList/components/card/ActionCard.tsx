import { useNavigate } from "react-router-dom";

import SparkleIcon from "@/assets/icons/common/sparkle.svg?react";
import AddIcon from "@/assets/icons/actionBar/add.svg?react";

export const ActionCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-4 w-full h-[76px] bg-white rounded-xl border border-secondary-gray0">
      <div className="flex items-center gap-3">
        <div
          className="flex justify-center items-center w-11 h-11 border border-secondary-gray0 bg-primary-gray rounded-lg">
          <SparkleIcon className="text-secondary-gray1 w-6 h-6"/>
        </div>
        <div className="flex flex-col justify-center text-[14px] h-[39px] mt-[2.5px]">
          <p className="font-bold tracking-[-.28px] text-secondary-darkgray3">새로운 테스트케이스</p>
          <p className="text-[12px] tracking-[-.24px] text-secondary-gray1 h-[22px] flex items-center">전자상거래 테스트케이스 뽑아줘</p>
        </div>
      </div>
      <button className="flex items-center" onClick={() => navigate("/")}>
        <AddIcon className="w-6 h-6 text-secondary-gray1"/>
      </button>
    </div>
  )
}