import LnbClose from "@/assets/icons/header/lnb-close.svg?react";
import LnbOpen from "@/assets/icons/header/lnb-open.svg?react";

import { Workspace } from "../workspace/Workspace";

import Alarm from "@/assets/icons/header/alarm.svg?react";
import Widget from "@/assets/icons/header/widget.svg?react";
import { ThemeToggle } from "./ThemeToggle";
import { useRecoilState } from "recoil";
import { themeAtom } from "@/recoil/themeAtoms";

interface HeaderProps {
  sidebarOpen: boolean;
  handleSidebar: (isOpen: boolean) => void;
  workspaceModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onConfirm: () => void;
    onToggle: () => void;
  };
  workspaceDropdown: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
  openLogoutModal: () => void;
}

export const Header = ({
  sidebarOpen,
  handleSidebar,
  workspaceModal,
  workspaceDropdown,
  openLogoutModal,
}: HeaderProps) => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="z-50 flex h-auto min-h-[60px] w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[1134px] items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => handleSidebar(!sidebarOpen)} className="relative">
            {sidebarOpen ? (
              <LnbClose className="h-6 w-6 text-secondary-gray2" />
            ) : (
              <LnbOpen className="h-6 w-6 text-secondary-gray2" />
            )}
          </button>
          <Workspace
            workspaceModal={workspaceModal}
            workspaceDropdown={workspaceDropdown}
            openLogoutModal={openLogoutModal}
          />
        </div>

        <div className="flex items-center gap-4 text-secondary-gray0 dark:text-secondary-darkgray3">
          {/* 다음 버전 활성화 예정 */}
          <button aria-label="Widget" disabled>
            <Widget className="h-6 w-6" />
          </button>
          <button aria-label="Notifications" disabled>
            <Alarm className="h-6 w-6" />
          </button>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};
