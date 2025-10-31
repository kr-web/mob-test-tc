import type { SvgIconType } from "./common";

export type MenuButtonType = {
  icon: SvgIconType;
  label: string;
  onClick?: () => void;
  type?: string;
};
