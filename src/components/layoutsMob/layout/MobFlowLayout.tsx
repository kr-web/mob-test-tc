import { motion } from "framer-motion";
import type { ReactNode } from "react";
import LogoBg from "@/assets/logo/mob-logo-symbol.png";

interface MobFlowLayoutProps {
  children: ReactNode;
  disableExit?: boolean;
}

export const MobFlowLayout = ({
                                children,
                                disableExit = false,
                                skipStart = false,
                              }: MobFlowLayoutProps & { skipStart?: boolean }) => {
  return (
    <motion.div
      initial={skipStart ? undefined : { opacity: 0, scale: 0.95, y: -20 }}
      animate={skipStart ? undefined : { opacity: 1, scale: 1, y: 0 }}
      exit={disableExit ? undefined : { opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed w-screen h-screen top-0 left-0 flex overflow-hidden bg-primary-gray z-[100] px-[30px]"
    >
      <img
        src={LogoBg}
        alt="Brand visual"
        className="absolute z-[-1] top-0 left-0 w-[292px] h-[285px]"
      />
      <div className="flex flex-col mt-[142px] w-full">{children}</div>
    </motion.div>
  );
};