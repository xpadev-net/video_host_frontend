import { useAtomValue} from "jotai";
import {ThemeAtom} from "@/atoms/Theme";
import {useEffect, useState} from "react";

export const useTheme = () => {
  const pTheme = useAtomValue(ThemeAtom);
  const [theme, setTheme] = useState<"dark"|"light">("dark");

  useEffect(() => {
    console.log(pTheme, theme);
    if (pTheme === "auto") {
      const dark = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(dark.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) => {
        console.log(e);
        setTheme(e.matches ? "dark" : "light");
      };
      dark.addEventListener("change", listener);
      return () => {
        dark.removeEventListener("change", listener);
      };
    }else {
      setTheme(pTheme);
    }
  }, [pTheme]);

  return theme;
}