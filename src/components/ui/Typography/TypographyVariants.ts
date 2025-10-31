export type StyleVariant =
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "body"
  | "body-lg"
  | "body-md"
  | "mini"
  | "menu"
  | "menu-lg"
  | "menu-sm";

export const textVariants: Record<StyleVariant, string> = {
  "title-lg": "font-bold text-[28px]",
  "title-md": "font-medium text-sm",
  "title-sm": "font-medium text-xs",
  body: "font-medium text-sm",
  "body-lg": "font-bold text-lg",
  "body-md": "font-semibold text-base",
  mini: "font-medium text-[10px] !leading-[13px]",
  menu: "font-medium text-base",
  "menu-lg": "font-semibold text-lg",
  "menu-sm": "font-medium text-xs",
};
