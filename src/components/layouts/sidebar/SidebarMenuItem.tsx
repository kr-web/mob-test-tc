import { Text } from "@/components/ui/Typography/Text";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { SvgIconType } from "@/types/common";

interface SidebarMenuItemProps {
  item: {
    label: string;
    icon: SvgIconType;
    link: string;
  };
  isActive: boolean;
  sidebarOpen: boolean;
}

export const SidebarMenuItem = ({ item, isActive, sidebarOpen }: SidebarMenuItemProps) => {
  const MenuIcon = item.icon;
  const [hover, setHover] = useState(false);
  const isDisabled = item.link === "disabled";

  const iconColor = isDisabled
    ? "bg-transparent text-secondary-darkgray3"
    : isActive
      ? "bg-primary-green text-primary-navy"
      : hover
        ? "bg-white text-primary-navy"
        : "bg-transparent text-white";

  const textColor = isDisabled
    ? "bg-transparent text-secondary-darkgray3"
    : isActive
      ? "text-primary-green"
      : hover
        ? "text-secondary-gray0"
        : "text-white";

  return (
    <Link
      to={isDisabled ? "#" : item.link}
      aria-disabled={isDisabled}
      className={`relative flex h-10 w-full items-center gap-4 pl-[25px] transition-colors duration-200 ${isDisabled ? "cursor-default" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 아이콘 */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-150 ${iconColor}`}
      >
        <MenuIcon className="h-6 w-6" />
      </div>

      {/* 텍스트 (slide in/out 애니메이션) */}
      <motion.div
        initial={false}
        animate={{
          width: sidebarOpen ? "auto" : 0,
          opacity: sidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex h-10 items-center overflow-hidden whitespace-nowrap"
      >
        <Text
          variant="menu"
          className={`flex-shrink-0 transition-colors duration-150 ${textColor}`}
        >
          {item.label}
        </Text>
      </motion.div>
    </Link>
  );
};
