import type { ComponentProps, FC } from "react";

import type { FilteredSeries } from "@/@types/v4Api";
import { MovieList } from "@/components/MovieList/MovieList";

type Props = Omit<ComponentProps<typeof MovieList>, "movies"> & {
  series: FilteredSeries;
};

export const SeriesList: FC<Props> = ({ series, ...props }) => {
  const movies =
    series.movies?.map((movie) => {
      return {
        ...movie,
        series: series,
      };
    }) ?? [];
  return <MovieList movies={movies} {...props} />;
};
