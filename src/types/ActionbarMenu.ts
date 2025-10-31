import type { SvgIconType } from "./common";

export type ActionBarMenu = {
  icon: SvgIconType;
  label: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
};
