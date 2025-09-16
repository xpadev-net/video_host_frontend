import type { FC, ReactNode } from "react";

import { useInfiniteScrolling } from "@/hooks/useInfiniteScrolling";

interface SearchListWrapperProps {
  hasNext: boolean;
  isValidating: boolean;
  setSize: (size: number | ((size: number) => number)) => void;
  children: ReactNode;
  loadingSkeleton: ReactNode;
  listClassName?: string;
  grid?: boolean;
}

export const SearchListWrapper: FC<SearchListWrapperProps> = ({
  hasNext,
  isValidating,
  setSize,
  children,
  loadingSkeleton,
  listClassName,
  grid = false,
}) => {
  const { loadMoreRef } = useInfiniteScrolling({
    hasNext,
    isValidating,
    setSize,
  });

  const listClasses = grid
    ? "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2"
    : "flex flex-col gap-1";

  return (
    <div className="flex flex-col gap-2">
      <div className={`${listClasses} ${listClassName || ""}`}>
        {children}
        {hasNext && (
          <>
            <div ref={loadMoreRef}>{loadingSkeleton}</div>
            {Array.from({ length: 8 })
              .map((_, i) => i)
              .map((i) => (
                <div key={`skeleton-${i}`}>{loadingSkeleton}</div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};
