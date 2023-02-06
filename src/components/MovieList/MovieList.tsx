import { MovieListProps } from "@/@types/MovieList";
import { MovieItem } from "@/components/MovieItem/MovieItem";
import Styles from "./MovieList.module.scss";

const MovieList = (props: MovieListProps) => {
  return (
    <div
      className={`${Styles.wrapper} ${
        props.direction === "row" ? Styles.row : Styles.column
      }`}
    >
      {props.movies.map((movie) => {
        return (
          <MovieItem
            key={movie.src}
            src={movie.src}
            alt={movie.alt}
            watched={movie.watched}
          />
        );
      })}
    </div>
  );
};

export { MovieList };
