import LogoBk from "@/assets/logo/logo-mob-bk.png";
import MenuIcon from "@/assets/icons/header/menu.svg?react";

interface SidebarProps{
  sidebarOpen : boolean,
  handleSidebar: (value: boolean) => void;
}

export const Header = ({ sidebarOpen, handleSidebar } : SidebarProps) => {
  return(
    <header className="flex items-center justify-between px-3 py-4 h-[42px]">
      <img className="h-[20px]" src={LogoBk} />
      <button onClick={() => handleSidebar(!sidebarOpen)}>
        <MenuIcon className="h-[14px]" />
      </button>
    </header>
  )
}