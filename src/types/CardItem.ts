import type { SvgIconType } from "./common";

export type BaseActionItem = {
  label: string;
  icon: SvgIconType;
};

export type LinkActionItem = BaseActionItem & {
  title?: string;
  link: string;
};

export type ButtonActionItem = BaseActionItem & {
  onClick: () => void;
};
