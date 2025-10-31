import Save from "@/assets/icons/tcEdit/header/correct.svg?react";
import Preview from "@/assets/icons/tcEdit/header/preview.svg?react";
import Connect from "@/assets/icons/tcEdit/header/thunder.svg?react";
import Trash from "@/assets/icons/common/trash.svg?react";
import type { MenuButtonType } from "@/types/MenuButtonType";

export const MenuButtonItems = (handlers: {
  onPreview?: () => void;
  onSave?: () => void;
  onConnect?: () => void;
  onDelete?: () => void;
}): MenuButtonType[] => [
  {
    icon: Save,
    label: "저장하기",
    onClick: handlers.onSave,
  },
  {
    icon: Preview,
    label: "미리보기",
    onClick: handlers.onPreview,
  },
  {
    icon: Connect,
    label: "연결하기",
    onClick: handlers.onConnect,
    type: "disabled",
  },
  {
    icon: Trash,
    label: "삭제하기",
    onClick: handlers.onDelete,
    type: "white",
  },
];
