import { useEffect, useMemo, useRef } from "react";

import { Movie } from "@/@types/Movie";
import { MovieCard } from "@/components/Movie";

import Styles from "./MovieList.module.scss";

export type props = {
  movies: Movie[];
  type: "row" | "column" | "minColumn";
  active?: string;
  className?: string;
};

const MovieList = ({ movies, type, active, className }: props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
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
  }, [movies, type, active]);
  return useMemo(() => {
    return (
      <div
        className={`${className} ${Styles.wrapper} ${Styles[type]}`}
        ref={wrapperRef}
      >
        {movies.map((movie, index) => {
          const indexLabel = (() => {
            if (active === undefined) return undefined;
            if (movie.url === active) return "active";
            return index + 1;
          })();
          return (
            <MovieCard
              key={`${movie.seriesUrl}/${movie.url}`}
              movie={movie}
              type={type}
              ref={
                active !== undefined && movie.url === active
                  ? activeRef
                  : undefined
              }
              index={indexLabel}
            />
          );
        })}
      </div>
    );
  }, [movies, type, active, className]);
};

export { MovieList };
