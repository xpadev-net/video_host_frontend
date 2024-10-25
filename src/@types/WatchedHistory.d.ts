import { FilteredMovie } from "@/@types/v4Api";

export type WatchedHistory = {
  [key: string]: {
    movie: FilteredMovie;
    watched: number;
  };
};
