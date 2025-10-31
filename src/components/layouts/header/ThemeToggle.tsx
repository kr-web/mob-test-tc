import { motion } from "framer-motion"; // ✅ Framer Motion import
import type { Theme } from "@/types/common";

export const ThemeToggle = ({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) => {
  const isDark = theme === "dark";
  return (
    <div className="relative flex w-[74px] rounded-lg bg-secondary-gray0 p-1">
      <motion.div
        layout
        layoutId="theme-pill"
        className={`absolute top-1 h-8 w-8 rounded-lg transition-colors duration-200 ${
          isDark ? "right-1 bg-primary-navy" : "left-1 bg-white"
        }`}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      <button
        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg"
        onClick={toggleTheme}
      >
        <span
          className={`text-base font-extrabold transition-colors duration-200 ${
            isDark ? "text-secondary-gray1" : "text-primary-navy"
          }`}
        >
          W
        </span>
      </button>

      <button
        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg"
        onClick={toggleTheme}
      >
        <span
          className={`text-base font-extrabold transition-colors duration-200 ${
            isDark ? "text-white" : "text-secondary-gray1"
          }`}
        >
          D
        </span>
      </button>
    </div>
  );
};
