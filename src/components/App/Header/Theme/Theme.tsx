import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

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
      {theme === "dark" ? <MoonStar /> : <Sun />}
    </Button>
  );
};
