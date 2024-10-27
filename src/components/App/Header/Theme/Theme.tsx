import { MdDarkMode, MdLightMode } from "react-icons/md";

import { useTheme } from "@/hooks/useTheme";

import styles from "../Button.module.scss";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={styles.button}
    >
      {theme === "dark" ? (
        <MdDarkMode className={styles.icon} />
      ) : (
        <MdLightMode className={styles.icon} />
      )}
    </button>
  );
};
