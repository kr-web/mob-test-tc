import PinIcon from "@/assets/icons/tcList/item/pin.svg?react";

interface PinButtonProps {
  pinned?: boolean;
  mirrored?: boolean;
  handlePin: () => void;
  className?: string;
}

export const PinButton = ({
  pinned = false,
  mirrored = false,
  className,
  handlePin,
}: PinButtonProps) => {
  return (
    <button>
      <PinIcon
        className={`h-6 w-6 hover:cursor-pointer ${mirrored && "scale-x-[-1]"} ${pinned ? "text-secondary-darkgray2 dark:text-secondary-gray1" : "text-secondary-gray1 dark:text-primary-gray"} ${className ?? ""}`}
        onClick={handlePin}
      />
    </button>
  );
};
