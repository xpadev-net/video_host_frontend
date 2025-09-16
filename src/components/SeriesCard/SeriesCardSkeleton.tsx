import { forwardRef } from "react";
import { UserSkeleton } from "../User/UserSkeleton";

export const SeriesCardSkeleton = forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} className="flex flex-row p-2 rounded-xl pointer-events-none">
    <div className="max-w-[40%] w-[357px] bg-[color:var(--color-skeleton)] rounded-lg relative overflow-hidden [aspect-ratio:16/9] animate-pulse" />
    <div className="flex-1 pl-[10px] flex flex-col gap-3">
      <span className="h-6 w-[80%] bg-[color:var(--color-skeleton)] rounded animate-pulse" />
      <UserSkeleton size="2" />
    </div>
  </div>
));
SeriesCardSkeleton.displayName = "SeriesCardSkeleton";
