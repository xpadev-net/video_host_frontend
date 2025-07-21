import { Theme as RadixTheme } from "@radix-ui/themes";
import type { ComponentProps, FC } from "react";

import { useTheme } from "@/hooks/useTheme";

export const Theme: FC<ComponentProps<typeof RadixTheme>> = (props) => {
  const { theme } = useTheme();
  return <RadixTheme appearance={theme} {...props} />;
};
