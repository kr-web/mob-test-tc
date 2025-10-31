import User from "@/assets/icons/sidePanel/user-tick.svg?react";
import Creditcard from "@/assets/icons/sidePanel/credit-card.svg?react";
import Shopping from "@/assets/icons/sidePanel/shopping-basket.svg?react";
import type { SvgIconType } from "@/types/common";

export interface SidePanelItem {
  title: string;
  icon: SvgIconType;
  label: readonly string[];
  textColor: string;
  bgColor: string;
  boxColor: string;
}

export const sidePanelItems = [
  {
    title: "인증/로그인/회원가입",
    icon: User,
    label: ["로그인 성공\n/실패 케이스", "SNS/SSO\n로그인", "이메일/휴대폰\n인증"],
    textColor: "text-white",
    bgColor: "bg-secondary-darkgray2",
    boxColor: "bg-secondary-darkgray3",
  },
  {
    title: "결제/정산",
    icon: Creditcard,
    label: [
      "카드 결제,\n계좌이체,\n간편결제",
      "결제 실패/\n취소 환불\n시나리오",
      "정기 결제(구독)\n흐름 검증",
    ],
    textColor: "text-white",
    bgColor: "bg-primary-blue",
    boxColor: "bg-primary-gray/10",
  },
  {
    title: "상품 정보",
    icon: Shopping,
    label: [
      "필수 입력값\n체크",
      "이미지\n업로드 형식/\n용량 제한 확인",
      "잘못된 값 입력시\n에러메시지\n노출 확인",
    ],
    textColor: "text-primary-navy",
    bgColor: "bg-primary-green",
    boxColor: "bg-primary-navy/10",
  },
] as const;
