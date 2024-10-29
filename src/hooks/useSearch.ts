import { v4GetMoviesRes, v4GetSeriesListRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (
  key: string,
): Promise<{
  movies: v4GetMoviesRes;
  series: v4GetSeriesListRes;
}> => {
  const [query, page, author] = key.split("/");

  const params: Record<string, string> = {};
  if (query) {
    params.query = query;
  }
  if (page) {
    params.page = page;
  }
  if (author) {
    params.author = author;
  }

  const urlSearchParam = new URLSearchParams(params).toString();
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
  author?: string;
};

export const useSearch = (data?: Props) => {
  const page = data?.page || 1;
  const query = data?.query || "";
  const author = data?.author || "";
  return useStickySWR(`${encodeURI(query)}/${page}/${author}`, fetcher, {});
};
