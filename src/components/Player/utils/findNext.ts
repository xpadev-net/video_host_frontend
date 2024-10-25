import {FilteredMovie} from "@/@types/v4Api";

export const findNext = (data: FilteredMovie) => {
  if (!data.series) return undefined;
  const currentIndex = data.series.movies.findIndex((episode) => episode.id === data.id);
  return data.series.movies[currentIndex + 1];
}
