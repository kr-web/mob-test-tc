import Menu from "@/assets/icons/tcEdit/header/menu.svg?react";
import { MenuButton } from "@/components/ui/button/MenuButton";
import { MenuButtonItems } from "@/features/tcEdit/constants/MenuButtonItems";
import PreviewGray from "@/assets/icons/tcEdit/header/preview-gray.svg?react-no-replace";

export const TcDisabledHeader = () => {
  const menuButtons = MenuButtonItems({});
  const disabledButtons = menuButtons.map(({ icon, label }) => ({
    icon: label === "미리보기" ? PreviewGray : icon,
    label,
    type: "disabled",
  }));
  return (
    <div className="relative flex max-h-14 w-full justify-between py-2.5">
      <div className="relative flex items-center gap-4">
        <Menu className="h-9 w-9 rounded-lg text-secondary-darkgray3" />
      </div>
      <div className="flex gap-2">
        {disabledButtons.map((item) => (
          <MenuButton key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};
