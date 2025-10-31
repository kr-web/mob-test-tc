import BackIcon from "@/assets/icons/common/back.svg?react-no-replace";
import { Text } from "../Typography/Text";
import clsx from "clsx";

interface BackButtonProps {
  label?: string;
  size?: string;
  onClick: () => void;
}

export const BackButton = ({ label = "", size = "size-6", onClick }: BackButtonProps) => {
  return (
    <button className="flex items-center gap-2" onClick={onClick}>
      <div className={clsx("flex items-center justify-center rounded-md bg-secondary-gray0", size)}>
        <BackIcon />
      </div>
      <Text variant="menu" className="font-pretendardVar text-secondary-gray2">
        {label}
      </Text>
    </button>
  );
};
