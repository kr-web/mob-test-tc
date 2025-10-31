import type {Dispatch, SetStateAction} from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


import { Workspace } from "../workspace/Workspace";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { menuItems } from "@/constants/menuItems";

import LogoutIcon from "@/assets/icons/actionBar/logout.svg?react-no-replace"
import CloseIcon from "@/assets/icons/actionBar/close.svg?react-no-replace";
import type { WorkspaceOption } from "@/types/workspaceOption.ts";

interface SidebarProps{
  sidebarOpen : boolean,
  handleSidebar: (value: boolean) => void;
  workspaceDropdown: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
  workspaceOption: WorkspaceOption[];
  setWorkspaceOption: Dispatch<SetStateAction<WorkspaceOption[]>>
  logoutOpen: () => void;
}

export const Sidebar = ({ sidebarOpen, handleSidebar, workspaceDropdown, workspaceOption, setWorkspaceOption, logoutOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1 }}
            exit={{opacity: 0}}
            className="fixed bg-transparent inset-0 z-[20]"
          />
          <motion.div
            initial={{right: -300}}
            animate={{right: sidebarOpen ? 0 : -300}}
            exit={{ right: -300 }}
            transition={{duration: 0.4, ease: "easeInOut"}}
            className="bg-primary-navy box-border w-[300px] rounded-tl-[12px] rounded-bl-[12px] fixed top-0 z-[70] h-screen py-4 flex justify-center"
          >
            <div className="relative flex w-[260px] flex-col items-end">
              {/* Close Section */}
              <button onClick={() => handleSidebar(!sidebarOpen)}>
                <CloseIcon className="w-[34px] h-[34px]" />
              </button>

              {/* Profile Section */}
              <Workspace
                workspaceDropdown={workspaceDropdown}
                workspaceOption={workspaceOption}
                setWorkspaceOption={setWorkspaceOption}
              />

              {/* Menu Section */}
              <nav className="flex flex-col w-full mt-8 gap-3">
                {menuItems.map((item) => {
                  const isActive = item.link !== "" && location.pathname === item.link;
                  const isDisabled = item.link === "disabled";

                  return (
                    <SidebarMenuItem
                      key={item.label}
                      item={item}
                      isActive={isActive}
                      isDisabled={isDisabled}
                    />
                  );
                })}
              </nav>

              {/* Logout Section */}
              <button
                className="absolute bottom-3 w-full h-9 px-5 flex items-center justify-end gap-2 bg-secondary-darkgray2 rounded-lg text-secondary-gray2"
                onClick={logoutOpen}
              >
                <LogoutIcon />Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}