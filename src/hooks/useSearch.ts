import { v4GetMoviesRes, v4GetSeriesListRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (
  key: string,
): Promise<{
  movies: v4GetMoviesRes;
  series: v4GetSeriesListRes;
}> => {
  const [query, page] = key.split("/");
  const urlSearchParam = new URLSearchParams({
    page: page,
    query: query,
  }).toString();
  const movies = await requests.get<v4GetMoviesRes>(
    `/movies/?${urlSearchParam}`,
  );
  const series = await requests.get<v4GetSeriesListRes>(
    `/series/?${urlSearchParam}`,
  );
  return {
    movies: movies.data,
    series: series.data,
  };
};

type Props = {
  page?: number;
  query?: string;
};

export const useSearch = (data?: Props) => {
  const page = data?.page || 1;
  const query = data?.query || "";
  return useStickySWR(`${query}/${page}`, fetcher, {});
};
