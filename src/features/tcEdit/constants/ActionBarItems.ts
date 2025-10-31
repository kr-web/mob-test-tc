import Sparkle from "@/assets/icons/common/sparkle.svg?react";
import Trash from "@/assets/icons/common/trash.svg?react";
import type { ActionBarMenu } from "@/types/ActionbarMenu";

export const ActionBarItems = (handlers: {
  onRegen?: () => void;
  onDelete?: () => void;
}): ActionBarMenu[] => [
  {
    icon: Sparkle,
    label: "부분재생성",
    onClick: handlers.onRegen,
    color: "text-secondary-purple",
  },
  {
    icon: Trash,
    label: "삭제",
    onClick: handlers.onDelete,
  },
];
