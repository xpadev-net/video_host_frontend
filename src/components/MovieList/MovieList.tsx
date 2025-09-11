import { useEffect, useMemo, useRef } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { MovieCard } from "@/components/Movie";

export type props = {
  movies: FilteredMovie[];
  type: "row" | "column" | "minColumn";
  active?: string;
  className?: string;
  showSeries?: boolean;
};

const MovieList = ({ movies, type, active, className, showSeries }: props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (
      type !== "minColumn" ||
      !active ||
      !activeRef.current ||
      !wrapperRef.current
    )
      return;
    wrapperRef.current.scrollTop =
      activeRef.current.offsetTop - activeRef.current.clientHeight;
  }, [type, active]);
  const wrapperClasses = useMemo(() => {
    const baseClasses = "flex relative";
    const typeClasses = {
      row: "flex-row overflow-x-scroll max-w-screen",
      column: "flex-col",
      minColumn: "flex-col",
    };
    return `${className || ""} ${baseClasses} ${typeClasses[type]}`;
  }, [className, type]);

  return useMemo(() => {
    return (
      <div className={wrapperClasses} ref={wrapperRef}>
        {movies.map((movie, index) => {
          const indexLabel = (() => {
            if (active === undefined) return undefined;
            if (movie.id === active) return "active";
            return index + 1;
          })();
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              type={type}
              ref={
                active !== undefined && movie.id === active
                  ? activeRef
                  : undefined
              }
              index={indexLabel}
              showSeries={showSeries}
            />
          );
        })}
      </div>
    );
  }, [movies, type, active, wrapperClasses, showSeries]);
};

export { MovieList };
