import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StopKeyboardPropagation: FC<Props> = ({ children }) => {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Ignore keyboard events on this div
    <div
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onKeyUp={(e) => {
        e.stopPropagation();
      }}
      onKeyPress={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
