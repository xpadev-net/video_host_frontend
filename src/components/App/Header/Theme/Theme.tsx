import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import styles from "../Button.module.scss";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size={"icon"}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      variant={"ghost"}
      className="cursor-pointer"
    >
      {theme === "dark" ? (
        <MoonStar className={styles.icon} />
      ) : (
        <Sun className={styles.icon} />
      )}
    </Button>
  );
};
