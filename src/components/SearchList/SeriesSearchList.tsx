import { type FC, useEffect, useRef } from "react";

import { SeriesCard, SeriesCardSkeleton } from "@/components/SeriesCard";
import { useSeriesListInfinite } from "@/hooks/useSeriesListInfinite";

import styles from "./SearchList.module.scss";

const elementIsVisibleInViewport = (
  el: HTMLElement,
  partiallyVisible = false,
) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

type Props = {
  query?: string;
  author?: string;
};

export const SeriesSearchList: FC<Props> = ({ query, author }) => {
  const { series, setSize, hasNext, isValidating } = useSeriesListInfinite({
    query,
    author,
  });
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

  if (!isValidating && (!series || series.length === 0)) {
    return (
      <div className={styles.wrapper}>
        <h2>検索結果がありません</h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {series.map((seriesItem) => (
          <SeriesCard series={seriesItem} key={seriesItem.id} />
        ))}
        {hasNext && (
          <>
            <SeriesCardSkeleton ref={loadMoreRef} />
            {Array.from({ length: 8 })
              .map((_, i) => i)
              .map((i) => (
                <SeriesCardSkeleton key={`skeleton-${i}`} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
