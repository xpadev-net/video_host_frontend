import { MovieListProps } from "@/@types/MovieList";
import { Movie } from "@/components/Movie/Movie";
import Styles from "./MovieList.module.scss";

const MovieList = ({ movies, type, active }: MovieListProps) => {
  return (
    <div className={`${Styles.wrapper} ${Styles[type]}`}>
      {movies.map((movie, index) => {
        return (
          <Movie
            key={`${movie.seriesUrl}/${movie.url}`}
            movie={movie}
            type={type}
            index={movie.url === active ? "active" : index}
          />
        );
      })}
    </div>
  );
};

export { MovieList };
