import Sparkle from "@/assets/icons/common/sparkle.svg?react";
import FolderPlus from "@/assets/icons/tcList/btn/folder-plus.svg?react-no-replace";
import type { LinkActionItem } from "@/types/CardItem";

export const generateBoxes: LinkActionItem[] = [
  {
    title: "새로운 테스트케이스",
    label: "전자상거래 테스트케이스 뽑아줘",
    icon: Sparkle,
    link: "/",
  },
  {
    title: "폴더 생성",
    label: "전자상거래 테스트케이스 뽑아줘",
    icon: FolderPlus,
    link: "disabled",
  },
];
