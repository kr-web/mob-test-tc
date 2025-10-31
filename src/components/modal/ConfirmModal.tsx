import {BaseModal} from "./BaseModal";
import {Text} from "../ui/Typography/Text";
import type {ReactNode} from "react";

interface ConfirmModalProps {
  isOpen: boolean,
  width?: string,
  zIndex?: string,
  onClose: () => void,
  title: string,
  cancelNm?: string,
  btnNm?: string,
  btnColor?: string,
  isDelete?: boolean,
  closeSize?: string,
  children: ReactNode,
  onCancel?: () => void,
  onConfirm?: () => void
}

export const ConfirmModal = ({
                               isOpen,
                               width = "w-[300px]",
                               zIndex = "z-[90]",
                               onClose,
                               title,
                               cancelNm = "취소하기",
                               btnNm = title,
                               isDelete,
                               closeSize,
                               children,
                               onCancel,
                               onConfirm
                             }: ConfirmModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={width}
      zIndex={zIndex}
      title={title}
      cancelNm={cancelNm}
      btnNm={btnNm}
      isDelete={isDelete}
      closeSize={closeSize}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <div className="bg-primary-gray px-6 py-5 rounded-lg">
        <Text variant="title-md" className="text-black break-keep whitespace-pre-line ">
          {children}
        </Text>
      </div>
    </BaseModal>
  );
};
