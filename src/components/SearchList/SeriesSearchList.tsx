import { type FC, useEffect, useRef } from "react";

import { SeriesCard, SeriesCardSkeleton } from "@/components/SeriesCard";
import { useSeriesListInfinite } from "@/hooks/useSeriesListInfinite";
import { elementIsVisibleInViewport } from "@/libraries/elementIsVisibleInViewport";

import styles from "./SearchList.module.scss";

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
