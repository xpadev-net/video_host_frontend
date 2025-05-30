import { v4GetMoviesRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";
import { buildQueryParams } from "@/utils/buildQueryParams";

const fetcher = async (key: string): Promise<v4GetMoviesRes> => {
  const res = await requests.get<v4GetMoviesRes>(key);
  return res.data;
};

type Props = {
  page?: number;
  query?: string;
  author?: string;
};

export const useMovies = (data?: Props) => {
  const page = data?.page || 1;
  const query = data?.query || undefined;
  const author = data?.author || undefined;

  return useStickySWR(
    `/movies?${buildQueryParams({
      page,
      query,
      author,
    })}`,
    fetcher,
    {},
  );
};
