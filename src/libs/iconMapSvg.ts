import type { SvgIconType } from "@/types/common";

const svgModules = import.meta.glob("@/assets/icons/**/*.svg?react", {
  eager: true,
});

export const ICONS_SVG: Record<string, SvgIconType> = {};

for (const path in svgModules) {
  const name = path.split("/").pop()!.replace(".svg", "");
  const mod = svgModules[path] as any;
  console.log("#############", svgModules, mod);
  ICONS_SVG[name] = mod.default?.ReactComponent ?? mod.default;

  if (!ICONS_SVG[name]) {
    console.error(`Could not load SVG component for: ${name}`);
  }
}
