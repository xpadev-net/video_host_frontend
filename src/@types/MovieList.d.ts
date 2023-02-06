import {MovieItemProps} from "@/@types/MovieItem";

export type MovieListProps = {
  movies: MovieItemProps[];
  direction: "row"|"column"
}