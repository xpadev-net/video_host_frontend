import {Movie} from "@/@types/Movie";

export type MovieListProps = {
  movies: Movie[];
  type: "row"|"column"|"minColumn";
  active?: string;
}