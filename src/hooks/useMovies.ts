import { v4GetMoviesRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (): Promise<v4GetMoviesRes> => {
  const res = await requests.get<v4GetMoviesRes>(`/movies/`);
  return res.data;
};

export const useMovies = () => {
  return useStickySWR("test", fetcher, {});
};
