import Edit from "@/assets/icons/tcEdit/header/edit.svg?react";
import { Text } from "@/components/ui/Typography/Text";
import { useRef, useState, type ReactNode } from "react";
import { Check, X } from "lucide-react";
import { getTextWidth } from "@/utils/getTextWidth";
import { useClickOutside } from "@/utils/useClickOutside";
import { MenuButton } from "@/components/ui/button/MenuButton";
import type { MenuButtonType } from "@/types/MenuButtonType";
import { TcListModalButton } from "./TcListModalButton";

interface baseProps {
  canEdit?: boolean;
  menuButtons: MenuButtonType[];
}

interface TcEditHeaderProps extends baseProps {
  tcListModal: {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
  };
  children?: never;
}

interface TcViewHeaderProps extends baseProps {
  tcListModal?: never;
  children: ReactNode;
}

type TcItemViewHeaderProps = TcEditHeaderProps | TcViewHeaderProps;

export const TcDetailViewHeader = ({
  tcListModal,
  children,
  menuButtons,
  canEdit = false,
}: TcItemViewHeaderProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState("로그인테스트케이스25094");

  const menuRef = useRef<HTMLDivElement>(null);
  if (tcListModal) useClickOutside(menuRef, tcListModal.onClose, tcListModal.isOpen);

  const handleSave = () => {
    setIsEditing(false);
    setTempValue(tempValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div className="relative flex max-h-14 w-full justify-between py-2.5">
      <div className="relative flex items-center gap-4" ref={menuRef}>
        {tcListModal && <TcListModalButton tcListModal={tcListModal} />}
        {children && <>{children}</>}

        {canEdit && isEditing ? (
          <div className="absolute left-[52px] top-0 z-20 flex w-fit flex-col items-start">
            <input
              value={tempValue}
              onChange={(e) => {
                setTempValue(e.target.value);
              }}
              className={`w-full resize-none appearance-none overflow-hidden rounded-t-lg rounded-bl-lg border border-primary-blue bg-primary-gray px-3 py-2.5 text-sm transition-none focus:outline-none`}
              style={{
                width: `${getTextWidth(tempValue, "16px", "Pretendard", "600") + 20}px`,
              }}
            />
            <div className="flex w-full justify-end">
              <div className="flex gap-1 rounded-b-lg bg-primary-blue px-2 py-1 text-white">
                <button onClick={handleSave}>
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Text variant="menu" className="!font-bold text-secondary-darkgray3">
              {tempValue}
            </Text>
            {canEdit && (
              <button onClick={() => canEdit && setIsEditing(true)}>
                <Edit className="h-6 w-6 text-secondary-gray1" />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {menuButtons.map((item) => (
          <MenuButton key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};
