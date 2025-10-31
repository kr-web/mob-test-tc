import type { SvgIconType } from "@/types/common";
import UserTick from "@/assets/icons/sidePanel/user-tick.svg?react";
import CreditCard from "@/assets/icons/sidePanel/credit-card.svg?react";
import ShoppingBasket from "@/assets/icons/sidePanel/shopping-basket.svg?react";

export interface SidePanelItem {
  title: string;
  icon: SvgIconType;
  textColor: string;
  bgColor: string;
}

export const sidePanelItems = [
  {
    title: "인증/로그인/회원가입",
    icon: UserTick,
    textColor: "text-white",
    bgColor: "bg-secondary-darkgray2",
  },
  {
    title: "결제/정산",
    icon: CreditCard,
    textColor: "text-white",
    bgColor: "bg-primary-blue",
  },
  {
    title: "상품 정보",
    icon: ShoppingBasket,
    textColor: "text-primary-navy",
    bgColor: "bg-primary-green",
  },
] as const;
