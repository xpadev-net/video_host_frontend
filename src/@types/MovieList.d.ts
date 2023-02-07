import {MovieItemProps} from "@/@types/Thumbnail";

export type MovieListProps = {
  movies: MovieItemProps[];
  direction: "row"|"column"
}