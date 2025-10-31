import { themeAtom } from "@/recoil/themeAtoms";
import { useEffect, type ReactNode } from "react";
import { useRecoilValue } from "recoil";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    return () => {
      root.classList.remove("light", "dark");
    };
  }, [theme]);

  return <>{children}</>;
};
