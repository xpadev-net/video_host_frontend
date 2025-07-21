import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StopKeyboardPropagation: FC<Props> = ({ children }) => {
  return (
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
