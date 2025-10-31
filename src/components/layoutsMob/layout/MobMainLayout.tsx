import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "@/components/layoutsMob/header/Header.tsx";
import { BackHeader } from "@/components/layoutsMob/header/BackHeader.tsx";
import { Sidebar } from "@/components/layoutsMob/sidebar/Sidebar.tsx";
import { useModal } from "@/hooks/useModal.ts";
import { ConfirmModal } from "@/components/modal/ConfirmModal.tsx";

import type { WorkspaceOption } from "@/types/workspaceOption.ts";

export const MobMainLayout = () => {
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const [ sidebarOpen, handleSidebar ] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const location = useLocation();
  const [heightOut, setHeightOut] = useState(false);
  const { isOpen, onOpen, onClose } = useModal();
  const workspaceDropdown = useModal();
  const [workspaceOption, setWorkspaceOption] = useState<WorkspaceOption[]>([
    { id: 1, name: "홍길동's Workspace", img: null, isSelected: true },
    { id: 2, name: "고길동's Workspace", img: null, isSelected: false },
  ]);

  // =========================================================================================
  // 높이 차단 ---------------------------------------------------------------------------------
  useEffect(() => {
    if (window.innerHeight <= 730) {
      setHeightOut(true);
    } else {
      setHeightOut(false);
    }
  }, []);

  // =========================================================================================
  // ACTION : logout action ------------------------------------------------------------------
  const logoutOpen = () => {
    onOpen();
    handleSidebar(!sidebarOpen);
  }

  const logoutActive = () => {
    onClose();
  }

  // ACTION : 사이드바 오픈 ---------------------------------------------------------------------
  useEffect(() => {
    if(sidebarOpen){
      handleSidebar(!sidebarOpen);
    }
  }, [location]);

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex h-screen overflow-hidden bg-primary-gray relative">
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleSidebar={handleSidebar}
        workspaceDropdown={workspaceDropdown}
        workspaceOption={workspaceOption}
        setWorkspaceOption={setWorkspaceOption}
        logoutOpen={logoutOpen}
      />

      <div className="flex flex-col w-full">
        {
          location.pathname === "/" ?
            <>
              <Header sidebarOpen={sidebarOpen} handleSidebar={handleSidebar}/>

              <main className="flex-1 p-5 flex justify-center h-[calc(100vh-42px)]">
                <div className={`flex flex-col items-center w-full
                    ${location.pathname === "/" && !heightOut ? "justify-center" : ""}`}>
                  <Outlet context={{ handleSidebar }}/>
                </div>
              </main>
            </>
          :
          <>
            <BackHeader title={title} sidebarOpen={sidebarOpen} handleSidebar={handleSidebar}/>

            <main className="flex-1 pt-3 px-5 flex justify-center h-screen overflow-hidden">
              <div className="flex flex-col gap-3 w-full">
                <Outlet context={{ setTitle }}/>
              </div>
            </main>
          </>
      }
    </div>
      
      {isOpen && (
        <ConfirmModal isOpen={isOpen} onClose={onClose} onConfirm={logoutActive} title="로그아웃" isDelete={true}>
          <>
            로그아웃하시겠어요?{"\n"}
            로그인 화면으로 돌아갑니다.{"\n"}
            (재로그인 필요)
          </>
        </ConfirmModal>
      )}
  </div>
  );
};
