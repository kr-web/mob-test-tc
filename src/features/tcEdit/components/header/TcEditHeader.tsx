import Menu from "@/assets/icons/tcEdit/header/menu.svg?react";
import Edit from "@/assets/icons/tcEdit/header/edit.svg?react";
import { Text } from "@/components/ui/Typography/Text";
import { useRef, useState } from "react";
import { TcListModal } from "../modal/TcListModal";
import { Check, X } from "lucide-react";
import { getTextWidth } from "@/utils/getTextWidth";
import { useClickOutside } from "@/utils/useClickOutside";
import { MenuButton } from "@/components/ui/button/MenuButton";
import type { MenuButtonType } from "@/types/MenuButtonType";

interface TcEditHeaderProps {
  tcListModal: {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
  };
  menuButtons: MenuButtonType[];
}

export const TcEditHeader = ({ tcListModal, menuButtons }: TcEditHeaderProps) => {
  const { isOpen, onToggle, onClose } = tcListModal;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState("로그인테스트케이스25094");

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, onClose, isOpen);

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
        <button onClick={onToggle}>
          <Menu
            className={`h-9 w-9 rounded-lg ${
              isOpen ? "bg-primary-navy text-white" : "text-secondary-darkgray3"
            }`}
          />
        </button>

        {isEditing ? (
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
            <button onClick={() => setIsEditing(true)}>
              <Edit className="h-6 w-6 text-secondary-gray1" />
            </button>
          </div>
        )}

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2">
            <TcListModal />
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
