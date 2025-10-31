import Intg from "@/assets/icons/actionBar/add.svg?react";
import Copy from "@/assets/icons/actionBar/copy.svg?react";
import Trash from "@/assets/icons/common/trash.svg?react";

export const ActionBarItems = (handlers: {
  onMerge: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) => [
  { icon: Intg, label: "통합", onClick: handlers.onMerge },
  { icon: Copy, label: "복제", onClick: handlers.onCopy },
  { icon: Trash, label: "삭제", onClick: handlers.onDelete },
];
