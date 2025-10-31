import Menu from "@/assets/icons/tcEdit/header/menu.svg?react";
import { TcListModal } from "@/features/tcEdit/components/modal/TcListModal";

interface TcListModal {
  tcListModal: {
    isOpen: boolean;
    onToggle: () => void;
  };
}

export const TcListModalButton = ({ tcListModal }: TcListModal) => {
  const { isOpen, onToggle } = tcListModal;
  return (
    <>
      <button onClick={onToggle}>
        <Menu
          className={`h-9 w-9 rounded-lg ${
            isOpen ? "bg-primary-navy text-white" : "text-secondary-darkgray3"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2">
          <TcListModal />
        </div>
      )}
    </>
  );
};
