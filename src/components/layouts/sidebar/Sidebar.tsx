import { menuItems } from "@/constants/menuItems";
import LogoMark from "@/assets/logo/logo-mark.svg?react";
import LogoFullSet from "@/assets/logo/logo-full-set.svg?react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SidebarMenuItem } from "./SidebarMenuItem";

interface SidebarProps {
  sidebarOpen: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const Sidebar = ({ sidebarOpen, handleMouseEnter, handleMouseLeave }: SidebarProps) => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ width: 102 }}
      animate={{ width: sidebarOpen ? 195 : 102 }} // 90(icon) + 93(text)
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed flex h-screen flex-col bg-primary-navy text-white shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 로고 */}
      <div className="ml-[29px] mt-8 flex items-center gap-[14px]">
        <LogoMark className="h-8 w-9 flex-shrink-0" />
        {sidebarOpen ? <LogoFullSet className="h-[10px] w-[76px] flex-shrink-0" /> : null}
      </div>

      {/* 메뉴 */}
      <nav className="mt-12 flex flex-col items-center justify-center gap-10">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <SidebarMenuItem
              key={item.label}
              item={item}
              isActive={isActive}
              sidebarOpen={sidebarOpen}
            />
          );
        })}
      </nav>
    </motion.div>
  );
};
