import Edit from "@/assets/icons/common/edit.svg?react";
import Trash from "@/assets/icons/common/trash.svg?react";

export const ActionBarItems = (handlers: { onRestore: () => void }) => [
  { icon: Edit, label: "복원", onClick: handlers.onRestore },
  {
    icon: Trash,
    label: "영구삭제",
    color: "text-status-false",
    disabled: true,
  },
];
