import { IoIosCloseCircleOutline } from "react-icons/io";

interface CloseButtonProps {
  onClose: () => void;
  size?: string;
}
export const CloseButton = ({ onClose, size = "size-6" }: CloseButtonProps) => {
  return (
    <button onClick={onClose}>
      <IoIosCloseCircleOutline className={`text-secondary-gray1 ${size}`} />
    </button>
  );
};
