import { type FC, useEffect, useRef } from "react";

import { MovieCard, MovieCardSkeleton } from "@/components/Movie";
import { useMovies } from "@/hooks/useMovies";

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

type MovieResultProps = {
  query?: string;
  author?: string;
  grid?: boolean;
};

export const MoviesSearchList: FC<MovieResultProps> = ({
  query,
  author,
  grid,
}) => {
  const { movies, setSize, hasNext, isValidating } = useMovies({
    query,
    author,
  });
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  if (!isValidating && (!movies || movies.length === 0)) {
    return (
      <div className={styles.wrapper}>
        <h2>検索結果がありません</h2>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div
        className={grid ? undefined : styles.list}
        style={
          grid
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 8,
              }
            : {}
        }
      >
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            type={grid ? "row" : "column"}
            key={movie.id}
            showSeries={true}
          />
        ))}
        {hasNext && (
          <>
            <MovieCardSkeleton ref={loadMoreRef} />
            {Array.from({ length: 8 }).map((_, i) => (
              <MovieCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
