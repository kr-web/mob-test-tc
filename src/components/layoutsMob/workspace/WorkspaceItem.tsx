import type {Dispatch, SetStateAction} from "react";
import { useNavigate } from "react-router-dom";

import {Check} from "lucide-react";
import type { WorkspaceOption } from "@/types/workspaceOption.ts";

interface WorkspaceItemProps {
  option: WorkspaceOption
  setWorkspaceOption: Dispatch<SetStateAction<WorkspaceOption[]>>
  onClose: () => void;
}

export const WorkspaceItem = ({ option, setWorkspaceOption, onClose } : WorkspaceItemProps) => {
  const navigate = useNavigate();
  const handleSelect = () => {
    navigate("/");
    setWorkspaceOption((prev) =>
      prev.map((o) => ({ ...o, isSelected: o.name === option.name }))
    );
    onClose();
  };

  return(
    <div className="w-full flex items-center justify-between gap-2" onClick={handleSelect}>
      <div className="flex items-center gap-2 ">
        {
          option.img ?
            <div
              className="w-8 h-8 flex items-center justify-center rounded-[100%] bg-white">
              <img src={URL.createObjectURL(option.img)} />
            </div>
            :
            <div
              className="w-8 h-8 flex items-center justify-center rounded-[100%] bg-[#C0FDDD] text-secondary-darkgray1 font-semibold">
              {option.name.charAt(0)}
            </div>
        }
        <p className={`${option.isSelected ? 'text-secondary-gray0' : 'text-secondary-gray1'} text-[14px]`}>
          {option.name}
        </p>
      </div>
      <Check className={`${option.isSelected ? 'text-secondary-gray0' : 'text-secondary-gray1'} w-6 h-6`} />
    </div>
  )
}