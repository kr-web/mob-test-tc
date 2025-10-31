import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";
import { Text } from "../ui/Typography/Text";
import { Button } from "../ui/button/Button";
import { CloseButton } from "../ui/button/CloseButton";

interface BaseModalProps {
  isOpen: boolean;
  width?: string;
  zIndex?: string;
  title?: string;
  children: ReactNode;
  cancelNm?: string;
  btnNm: string;
  isDelete?: boolean;
  onClose: () => void;
  closeSize?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  canCloseOnClick?: () => boolean;
}

export function BaseModal({
  isOpen,
  width = "w-[620px]",
  zIndex = "z-[90]",
  title,
  children,
  cancelNm = "취소하기",
  btnNm,
  isDelete = false,
  onClose,
  closeSize = "size-6",
  onCancel,
  onConfirm, canCloseOnClick,
}: BaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={clsx("fixed inset-0 flex items-center justify-center p-4 text-center", zIndex)}>
          <motion.div
            className="fixed inset-0 bg-primary-gray/80"
            onClick={() => {
              // 조건 검사 후 닫기
              if (typeof onClose === "function" && (!canCloseOnClick || canCloseOnClick())) {
                onClose();
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "relative z-50 flex h-auto flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-xl",
              width,
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <Text
                variant="body-lg"
                className="whitespace-pre-line text-left leading-[18px] text-primary-navy"
              >
                {title}
              </Text>
              <CloseButton onClose={onClose} size={closeSize} />
            </div>

            {/* Content */}
            <div className="flex-1">{children}</div>

            <div className="flex justify-between">
              <Button
                variant="mini"
                className="border border-secondary-gray2 bg-primary-gray"
                onClick={onCancel || onClose}
              >
                <span className="text-sm font-semibold text-secondary-gray2">{cancelNm}</span>
              </Button>
              <Button
                variant="mini"
                className={`${isDelete ? "bg-status-false" : "bg-primary-navy"}`}
                onClick={onConfirm}
              >
                <span className="text-sm font-semibold text-secondary-gray0">{btnNm}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
