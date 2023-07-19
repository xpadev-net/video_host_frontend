import { MovieCard } from "@/components/Movie";
import Styles from "./MovieList.module.scss";
import { useEffect, useMemo, useRef } from "react";
import { Movie } from "@/@types/Movie";

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
              index={
                active !== undefined
                  ? movie.url === active
                    ? "active"
                    : index + 1
                  : undefined
              }
            />
          );
        })}
      </div>
    );
  }, [movies, type, active]);
};

export { MovieList };
