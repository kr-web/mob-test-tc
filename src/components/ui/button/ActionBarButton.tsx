import type { ActionBarMenu } from "@/types/ActionbarMenu";
import { Text } from "../Typography/Text";
import clsx from "clsx";

interface ActionBarButton {
  menu: ActionBarMenu;
  disabled: boolean;
}

export const ActionBarButton = ({ menu, disabled }: ActionBarButton) => {
  const SvgIcon = menu.icon;
  const isDisabeld = disabled || menu.disabled;

  const iconColor = isDisabeld ? "text-secondary-gray0" : menu.color || "text-secondary-gray1";

  const textColor = isDisabeld ? "text-secondary-gray0" : menu.color || "text-secondary-darkgray3";

  return (
    <button className="flex items-center gap-1 px-5 hover:cursor-pointer" onClick={menu.onClick}>
      <SvgIcon className={clsx("h-6 w-6", iconColor)} />

      <Text variant="body" className={`${textColor}`}>
        {menu.label}
      </Text>
    </button>
  );
};
