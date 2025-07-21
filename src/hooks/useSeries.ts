import type { v4GetSeriesRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (key?: string): Promise<v4GetSeriesRes> => {
  if (!key)
    return Promise.resolve({
      status: "error",
      code: 404,
      message: "not found",
    });
  const res = await requests.get<v4GetSeriesRes>(`/series/${key}`);
  return res.data;
};

export const useSeries = (query?: string) => {
  return useStickySWR(query, fetcher, {});
};
