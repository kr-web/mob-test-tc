import { motion, AnimatePresence } from "framer-motion";

import CloseIcon from "@/assets/icons/actionBar/close.svg?react-no-replace";
import iconYes from "@/assets/icons/toast/yes.svg?react";
import iconNo from "@/assets/icons/toast/no.svg?react";
import iconInfo from "@/assets/icons/toast/info.svg?react";
import iconWarning from "@/assets/icons/toast/warning.svg?react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const Toast = ({ toast, title, content, type, onClose }: any) => {
  const IconComponent =
    type === "Y"
      ? iconYes
      : type === "N"
        ? iconNo
        : type === "I"
          ? iconInfo
          : type === "W"
            ? iconWarning
            : iconYes;

  // =========================================================================================
  // 환경 관리 --------------------------------------------------------------------------------
  const isMobile = useIsMobile();

  return (
    <AnimatePresence>
      {toast && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed left-0 right-0 z-[100] m-auto flex h-auto w-[300px] flex-col gap-2 rounded-lg bg-primary-navy p-3 ${isMobile ? "top-[30px]" : "bottom-[100px]"}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-1">
                <IconComponent className={`${isMobile ? "h-6 w-6" : "h-5 w-5"}`} />
                <div
                  className={`flex w-full flex-col gap-1 tracking-[-2%] text-white ${isMobile ? "text-[16px]" : "text-[12px]"}`}
                >
                  <p className="font-bold">{title}</p>
                  <span className="whitespace-pre-line">{content}</span>
                </div>
              </div>
              <button onClick={onClose}>
                <CloseIcon className={`text-secondary-gray2 ${isMobile ? "h-7 w-7" : "h-6 w-6"}`} />
              </button>
            </div>
            <div className="relative h-2 w-full rounded-xl bg-secondary-gray1">
              <motion.div
                className="absolute h-2 rounded-xl bg-primary-green"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                onAnimationComplete={onClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
