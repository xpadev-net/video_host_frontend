import { MdDarkMode, MdLightMode } from "react-icons/md";

import { useTheme } from "@/hooks/useTheme";

import styles from "./Theme.module.scss";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={styles.button}
    >
      {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};
