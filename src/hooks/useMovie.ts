import { v4GetMovieRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (key?: string): Promise<v4GetMovieRes> => {
  if (!key) return Promise.resolve({ status: "error", code:404, message: "not found" });
  const res = await requests.get<v4GetMovieRes>(`/movies/${key}`);
  return res.data;
};

export const useMovie = (query?: string) => {
  return useStickySWR(query, fetcher, {});
};
