import Edit from "@/assets/icons/tcEdit/header/edit.svg?react";
import { useRef, type ReactNode } from "react";
import { useClickOutside } from "@/utils/useClickOutside";
import { Text } from "@/components/ui/Typography/Text";
import { TcListModal } from "@/features/tcEdit/components/modal/TcListModal";
import { MenuButton } from "@/components/ui/button/MenuButton";
interface TcEditHeaderProps {
  tcTitle: string;
  tcListModal?: {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
  };
  children: ReactNode;
  onButtonClick: () => void;
}

export const TcItemViewHeader = ({
  tcTitle,
  tcListModal,
  children,
  onButtonClick,
}: TcEditHeaderProps) => {
  const { isOpen, onClose } = tcListModal ?? {};

  const menuRef = useRef<HTMLDivElement>(null);
  if (isOpen && onClose) {
    useClickOutside(menuRef, onClose, isOpen);
  }

  const actionButton = { icon: Edit, label: "복원하기", onClick: onButtonClick };

  return (
    <div className="relative flex max-h-14 w-full justify-between py-2.5">
      <div className="relative flex items-center gap-4" ref={menuRef}>
        {children}
        <div className="flex items-center gap-1">
          <Text variant="menu" className="!font-bold text-secondary-darkgray3">
            {tcTitle}
          </Text>
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2">
            <TcListModal />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <MenuButton item={actionButton} />
      </div>
    </div>
  );
};
