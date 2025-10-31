import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BackIcon from "@/assets/icons/header/back-arrow.svg?react";
import MenuIcon from "@/assets/icons/header/menu.svg?react";

interface BackHeaderProps {
  title : string;
  sidebarOpen : boolean,
  handleSidebar: (value: boolean) => void;
}

export const BackHeader = ({ title, sidebarOpen, handleSidebar } : BackHeaderProps) => {
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const [ useNav, setUseNav ] = useState<boolean>(true);

  // =========================================================================================
  // 사이드바 Y/N ------------------------------------------------------------------------------
  useEffect(() => {
    if(location.pathname === "/tcList" || location.pathname === "/trash"){
      setUseNav(true);
    }else{
      setUseNav(false);
    }
  }, );

  // =========================================================================================
  // ACTION : 뒤로가기 -------------------------------------------------------------------------
  const BackStep = () => {
    if(location.pathname === "/view"){
      navigate("/tcList");
    }else{
      navigate(-1);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <header className="flex justify-between items-center px-3 py-4 h-[42px]">
      <div className="flex gap-4">
        <button
          className="w-6 h-6 rounded-md bg-secondary-gray0 flex justify-center items-center"
          onClick={BackStep}
        >
          <BackIcon className="w-4 h-4 text-secondary-gray1" />
        </button>
        <p className="font-bold text-md text-secondary-darkgray3 leading-normal tracking-[-0.02em]">{title}</p>
      </div>
      {
        useNav &&
				<button onClick={() => handleSidebar(!sidebarOpen)}>
          <MenuIcon className="w-[14px] h-[14px]"/>
				</button>
      }
    </header>
  );
};
