import {type Dispatch, type SetStateAction, useState} from "react";

import { WorkspaceDefault } from "./WorkspaceDefault";
import { WorkspaceItem } from "./WorkspaceItem";
import { WorkspaceProfile } from "./WorkspaceProfile";

import type { WorkspaceOption } from "@/types/workspaceOption.ts";

interface WorkspaceProps {
  workspaceDropdown: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
  workspaceOption: WorkspaceOption[];
  setWorkspaceOption: Dispatch<SetStateAction<WorkspaceOption[]>>
}

export const Workspace = ({ workspaceDropdown, workspaceOption, setWorkspaceOption }: WorkspaceProps) => {
  const { isOpen, onClose, onToggle } = workspaceDropdown;
  const [tcLength] = useState<number>(12);
  const [tcTime] = useState<number>(12);

  ////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col w-full items-center mt-12">
      <WorkspaceDefault
        selectedItem={workspaceOption.find((option) => option.isSelected) ?? null}
        onToggle={onToggle}
      />

      <div className="relative">
        {
          isOpen &&
					<div className="absolute z-10 mt-[22px] w-[260px] rounded-lg bg-secondary-darkgray3 px-3 py-[10px]">
            <div className={`flex flex-col items-center gap-[10px] ${workspaceOption.length > 10 ? 'scroll h-[410px] overflow-y-auto pr-[10px]' : ''}`}>
              {
                workspaceOption.map((option) => (
                  <WorkspaceItem
                    key={option.name}
                    option={option}
                    setWorkspaceOption={setWorkspaceOption}
                    onClose={onClose}
                  />
                ))
              }
            </div>
					</div>
        }

        <WorkspaceProfile
          tcLength={tcLength}
          tcTime={tcTime}
        />
      </div>
    </div>
  )
}