import { v4GetMoviesRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (key: string): Promise<v4GetMoviesRes> => {
  const urlSearchParam = new URLSearchParams({
    page: key,
  }).toString();
  const res = await requests.get<v4GetMoviesRes>(`/movies/?${urlSearchParam}`);
  return res.data;
};

type Props = {
  page?: number;
};

export const useMovies = (data?: Props) => {
  const page = data?.page || 1;
  return useStickySWR(`${page}`, fetcher, {});
};
