import { Text } from "@/components/ui/Typography/Text";
import type { MenuButtonType } from "@/types/MenuButtonType";

interface MenuButtonProps {
  item: MenuButtonType;
  onClick?: () => void;
}

export const MenuButton = ({ item }: MenuButtonProps) => {
  const SvgIcon = item.icon;
  const isDisabled = item.type === "disabled";

  const bgColor =
    item.type === "disabled"
      ? "bg-secondary-gray0"
      : item.type === "white"
        ? "bg-secondary-gray1"
        : "bg-secondary-darkgray3";

  const textColor =
    item.type === "white"
      ? "text-primary-gray"
      : item.type === "disabled"
        ? "text-secondary-gray2"
        : "text-secondary-gray0";

  return (
    <button
      className={`flex min-h-9 w-fit items-center gap-2 rounded-lg px-4 py-[2px] ${bgColor}`}
      onClick={item.onClick}
      disabled={isDisabled}
    >
      <SvgIcon className={`h-6 w-6 ${textColor}`} />
      <Text variant="body-md" className={`text-sm text-secondary-gray0 ${textColor}`}>
        {item.label}
      </Text>
    </button>
  );
};
