import {MovieItem} from "@/@types/api";

export type WatchedHistory = {
  [key: string]: {
    movie: MovieItem;
    watched: number;
  }
}