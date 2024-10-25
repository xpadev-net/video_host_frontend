import { v4GetMovieRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = (key?: string): Promise<v4GetMovieRes> => {
  if (!key) return Promise.resolve({ status: "error", message: "not found" });
  return requests.get<v4GetMovieRes>(`/movies/${key}`).then((res) => res.data);
};

export const useMovie = (query?: string) => {
  return useStickySWR(query, fetcher, {});
};
