import { Header } from "@/components/layouts/header/Header";
import { Sidebar } from "@/components/layouts/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";
import {ConfirmModal} from "@/components/modal/ConfirmModal.tsx";

export const MainLayout = () => {
  const [ sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const workspaceModal = useModal();
  const workspaceDropdown = useModal();
  const workspaceLogout = useModal();

  // ACTION : SIDEBAR -------------------------------------------
  const handleSidebar = (open : boolean) => {
    setSidebarOpen(open);
  };

  const handleMouseEnter = () => {
    !sidebarOpen && handleSidebar(!sidebarOpen);
  };

  const handleMouseLeave = () => {
    sidebarOpen && handleSidebar(!sidebarOpen);
  };

  // ACTION : 로그아웃 ---------------------------------------------
  const handleLogout = () => {
    workspaceLogout.onClose();
  }

  return (
    <ThemeProvider>
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />

        <motion.div
          initial={{ width: "calc(100% - 90px)" }}
          animate={{ width: sidebarOpen ? "calc(100% - 183px)" : "calc(100% - 90px)" }} // 90(icon) + 93(text)
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed right-0 flex h-screen rounded-bl-xl rounded-tl-xl bg-primary-gray dark:bg-secondary-darkgray1"
        >
          <div className="flex h-full w-full flex-col">
            <Header
              sidebarOpen={sidebarOpen}
              handleSidebar={handleSidebar}
              workspaceModal={workspaceModal}
              workspaceDropdown={workspaceDropdown}
              openLogoutModal={workspaceLogout.onOpen}
            />

            {/* main content */}
            {location.pathname === "/" && window.innerHeight <= 695 ? (
              <Outlet />
            ) : (
              <main className="flex flex-1 overflow-hidden" onClick={() => handleSidebar(false)}>
                <div className="flex w-full justify-center">
                  <div className="mt-1 flex h-full w-[1134px] flex-col">
                    <Outlet />
                  </div>
                </div>
              </main>
            )}
          </div>
        </motion.div>

        { workspaceLogout.isOpen && (
            <ConfirmModal
              isOpen={workspaceLogout.isOpen}
              onClose={workspaceLogout.onClose}
              onConfirm={handleLogout}
              title="로그아웃"
              isDelete={true}
              children={`로그아웃하시겠어요?
              로그인 화면으로 돌아갑니다.
              (재로그인 필요)
            `}
            />
          )
        }
      </div>
    </ThemeProvider>
  );
};
