import type { FilteredMovie } from "@/@types/v4Api";

export const findNext = (data: FilteredMovie) => {
  if (!data?.series) return undefined;
  const currentIndex = data.series.movies?.findIndex(
    (episode) => episode.id === data.id,
  );
  if (currentIndex === -1 || currentIndex === undefined) return undefined;
  return data.series.movies?.[currentIndex + 1];
};

export const findPrev = (data: FilteredMovie) => {
  if (!data?.series) return undefined;
  const currentIndex = data.series.movies?.findIndex(
    (episode) => episode.id === data.id,
  );
  if (currentIndex === -1 || currentIndex === undefined) return undefined;
  return data.series.movies?.[currentIndex - 1];
};
