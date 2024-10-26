import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { ThemeAtom } from "@/atoms/Theme";

export const useTheme = () => {
  const [pTheme, setPTheme] = useAtom(ThemeAtom);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (pTheme === "auto") {
      const dark = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(dark.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
      };
      dark.addEventListener("change", listener);
      return () => {
        dark.removeEventListener("change", listener);
      };
    } else {
      setTheme(pTheme);
    }
  }, [pTheme]);

  return { theme, setTheme: setPTheme };
};
