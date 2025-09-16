import { useEffect, useRef } from "react";

import { elementIsVisibleInViewport } from "@/libraries/elementIsVisibleInViewport";

interface UseInfiniteScrollingProps {
  hasNext: boolean;
  isValidating: boolean;
  setSize: (size: number | ((size: number) => number)) => void;
}

export const useInfiniteScrolling = ({
  hasNext,
  isValidating,
  setSize,
}: UseInfiniteScrollingProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNext) return;

    const io = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNext && !isValidating) {
        void setSize((size) => size + 1);
      }
    });

    io.observe(loadMoreRef.current);

    if (loadMoreRef.current) {
      const isVisible = elementIsVisibleInViewport(loadMoreRef.current);
      if (isVisible && hasNext && !isValidating) {
        void setSize((size) => size + 1);
      }
    }

    return () => io.disconnect();
  }, [hasNext, isValidating, setSize]);

  return { loadMoreRef };
};
