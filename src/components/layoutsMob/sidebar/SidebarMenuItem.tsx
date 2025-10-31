import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SidebarMenuItemProps {
  item: { label: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; link: string };
  isActive: boolean;
  isDisabled: boolean;
}

export const SidebarMenuItem = ({ item, isActive, isDisabled }: SidebarMenuItemProps) => {
  const MenuIcon = item.icon;

  const iconColor = isDisabled
    ? "bg-transparent text-secondary-darkgray3"
    : isActive
      ? "bg-primary-green text-primary-navy"
      : "bg-transparent text-white";

  const textColor = isDisabled
    ? "bg-transparent text-secondary-darkgray3"
    : isActive
      ? "text-primary-green"
      : "text-white";

  return (
    <Link
      to={isDisabled ? "#" : item.link}
      onClick={(e) => {
        if (isDisabled) e.preventDefault();
      }}
      aria-disabled={isDisabled}
      className="group flex w-full items-center gap-4"
    >
      <div
        className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-2 transition-all ${iconColor}`}
      >
        <MenuIcon className="h-10 w-10" />
      </div>

      <motion.span
        key="label"
        className={`flex h-10 w-[82px] items-center justify-start text-base font-medium ${textColor} ${isDisabled ? "cursor-not-allowed" : ""} `}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {item.label}
      </motion.span>
    </Link>
  );
};
