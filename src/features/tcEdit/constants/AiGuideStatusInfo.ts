import { IoIosCheckmarkCircle, IoMdInformationCircle } from "react-icons/io";

export const AiGuideStatusInfo = {
  success: {
    icon: IoIosCheckmarkCircle,
    color: "text-status-true",
    label: "재생성 성공!",
  },
  fail: {
    icon: IoMdInformationCircle,
    color: "text-status-false",
    label: "재생성 실패!",
  },
  collapsed: {
    icon: IoMdInformationCircle,
    color: "text-secondary-gray2",
    label: "접힘 상태",
  },
} as const;

export type AiStatus = keyof typeof AiGuideStatusInfo;
