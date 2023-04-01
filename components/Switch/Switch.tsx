import { ReactNode } from "react";
import Styles from "@/components/Switch/Switch.module.scss";
import * as RadixSwitch from "@radix-ui/react-switch";

type props = {
  children?: ReactNode;
  checked: boolean;
};

const Switch = ({ children, checked }: props) => {
  return (
    <RadixSwitch.Root
      className={`${Styles.root} ${checked && Styles.checked}`}
      id="airplane-mode"
      checked={checked}
    >
      <RadixSwitch.Thumb className={Styles.thumb}>{children}</RadixSwitch.Thumb>
    </RadixSwitch.Root>
  );
};

export { Switch };
