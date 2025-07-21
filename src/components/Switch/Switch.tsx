import * as RadixSwitch from "@radix-ui/react-switch";
import type { ReactNode } from "react";

import Styles from "@/components/Switch/Switch.module.scss";

type props = {
  children?: ReactNode;
  checked: boolean;
};

const Switch = ({ children, checked }: props) => {
  return (
    <RadixSwitch.Root
      className={`${Styles.root} ${checked && Styles.checked}`}
      checked={checked}
    >
      <RadixSwitch.Thumb className={Styles.thumb}>{children}</RadixSwitch.Thumb>
    </RadixSwitch.Root>
  );
};

export { Switch };
