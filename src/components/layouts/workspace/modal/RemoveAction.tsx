import { useState } from "react";
import DeleteIcon from "@/assets/icons/common/delete.svg?react-no-replace";

export const RemoveAction = ({ onRemove } : { onRemove : () => void; }) => {
  const [removeHover, setRemoveHover] = useState(false);

  return (
    <button
      className="relative"
      onClick={() => setRemoveHover(true)}
    >
      <DeleteIcon className={`${removeHover ? "text-secondary-darkgray2" : "text-secondary-gray1"}`}/>

      {removeHover && (
        <div
          className="absolute left-7 top-[-6px]
                    rounded-lg px-4 py-2 bg-white shadow-soft-md
                    whitespace-nowrap z-10"
          onClick={onRemove}
          onMouseLeave={() => setRemoveHover(false)}
        >
          <span className="font-semibold text-secondary-darkgray3">워크스페이스 삭제</span>
        </div>
      )}
    </button>
  )
}