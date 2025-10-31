import { ArrowRight } from "lucide-react";
import UserTick from "@/assets/icons/sidePanel/user-tick.svg?react";
import CreditCard from "@/assets/icons/sidePanel/credit-card.svg?react";
import ShoppingBasket from "@/assets/icons/sidePanel/shopping-basket.svg?react";

export const SidePanel = () => {
   return (
    <div className="flex flex-col w-full mt-[4vh] gap-3">
      <p className="text-primary-navy text-sm tracking-[0.0175em]">
        주제별로 TC도 추천해줄게요
      </p>
      <div className="flex gap-2">
        {/* 왼쪽 큰 카드 */}
        <button data-navigate="/sample/1" className="flex-1 bg-secondary-darkgray2 text-white rounded-xl p-5 flex flex-col justify-between h-[200px]">
          <div className="flex flex-col items-start gap-3">
            <UserTick className="w-5 h-5"/>
            <span className="text-left font-medium text-[14px] leading-[16px] traking-[-.02em]">인증/로그인<br/>회원가입</span>
          </div>
          <div className="flex justify-end relative">
            <ArrowRight className="w-6 h-6" />
          </div>
        </button>

        {/* 오른쪽 작은 카드들 */}
        <div className="flex flex-col gap-2 flex-1">
          <button data-navigate="/sample/2" className="relative bg-primary-blue text-white rounded-xl p-5 flex flex-col justify-between h-[96px]">
            <div className="flex flex-col justify-center gap-3 mt-1">
              <CreditCard className="w-5 h-5"/>
              <span className="text-left font-medium text-[14px] leading-[16px] traking-[-.02em]">결제/정산</span>
            </div>
            <div className="flex justify-end absolute top-1/2 transform -translate-y-1/2 right-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>

          <button data-navigate="/sample/3" className="relative bg-primary-green text-primary-navy rounded-xl p-5 flex flex-col justify-between h-[96px]">
            <div className="flex flex-col justify-center gap-3 mt-1">
              <ShoppingBasket className="w-5 h-5"/>
              <span className="text-left font-medium text-[14px] leading-[16px] traking-[-.02em]">상품 정보</span>
            </div>
            <div className="flex justify-end absolute top-1/2 transform -translate-y-1/2 right-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
