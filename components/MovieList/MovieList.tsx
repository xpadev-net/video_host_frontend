import { MovieListProps } from "@/@types/MovieList";
import { Movie } from "@/components/Movie/Movie";
import Styles from "./MovieList.module.scss";
import { useMemo } from "react";

const MovieList = ({ movies, type, active }: MovieListProps) => {
  return useMemo(() => {
    return (
      <div className={`${Styles.wrapper} ${Styles[type]}`}>
        {movies.map((movie, index) => {
          return (
            <Movie
              key={`${movie.seriesUrl}/${movie.url}`}
              movie={movie}
              type={type}
              index={
                active !== undefined
                  ? movie.url === active
                    ? "active"
                    : index
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
