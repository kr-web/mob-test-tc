import { useEffect, useRef, useState } from "react";
import { AiGuideResultSuccess } from "./AiGuideResultSuccess";
import { AiGuideResultFail } from "./AiGuideResultFail";
import type { AiGuideResultProps } from "../../types/AiGuideResult";
import clsx from "clsx";
import { AiResultLineIndicator } from "./components/AiResultLineIndicator";
import { AiResultHeader } from "./components/AiResultHeader";
import { usePagination } from "@/hooks/usePagination";
import { AnimatePresence, motion } from "framer-motion";

// interface AiGuideResultItemProps extends AiGuideResultProps {
//   onClose: () => void;
// }

export const AiGuideResultItem = ({ line, items }: AiGuideResultProps) => {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});
  const [borderHeight, setBorderHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = !!openMap[line];
  const pagination = usePagination(items.length, 1);

  const onToggle = (line: number) => {
    setOpenMap((prev) => ({ ...prev, [line]: !prev[line] }));
  };

  const [direction, setDirection] = useState<1 | -1>(1);

  const currentItem = items[pagination.currentPage - 1];
  const status = !isOpen ? "collapsed" : currentItem.result;

  // content 높이에 따른 세로 line
  useEffect(() => {
    if (contentRef.current) setBorderHeight(contentRef.current.offsetHeight);
  }, [isOpen]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
      position: "absolute",
    }),
  };

  const handlePageChange = (nextPage: number) => {
    if (!isOpen) setOpenMap((prev) => ({ ...prev, [line]: true }));
    setDirection(nextPage > pagination.currentPage ? 1 : -1);
    pagination.handlePageChange(nextPage);
  };

  return (
    <div className="flex w-full cursor-pointer flex-col items-start gap-3">
      <div
        className={clsx(
          "w-full border-t transition-all duration-200",
          !isOpen ? "border-secondary-gray0 opacity-100" : "border-transparent opacity-0",
        )}
      />

      <div
        className="flex w-full items-start gap-3"
        onClick={() => onToggle(line)}
        ref={contentRef}
      >
        <AiResultLineIndicator line={line} status={status} borderHeight={borderHeight} />

        <motion.div
          key={currentItem.id} // ✅ currentItem 변경 감지
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="flex w-full flex-col gap-1.5"
        >
          <AiResultHeader
            line={line}
            status={status}
            pagination={{ ...pagination, handlePageChange: handlePageChange }}
          />

          {isOpen && (
            <AnimatePresence mode="wait" custom={direction}>
              {currentItem.result === "success" ? (
                <AiGuideResultSuccess item={currentItem} onToggle={onToggle} />
              ) : (
                <AiGuideResultFail item={currentItem} onToggle={onToggle} />
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};
