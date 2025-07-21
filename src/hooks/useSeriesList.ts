import type { v4GetSeriesListRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";
import { buildQueryParams } from "@/utils/buildQueryParams";

const fetcher = async (key: string): Promise<v4GetSeriesListRes> => {
  const res = await requests.get<v4GetSeriesListRes>(key);
  return res.data;
};

type Props = {
  page?: number;
  query?: string;
  author?: string;
};

export const useSeriesList = (data?: Props) => {
  const page = data?.page || 1;
  const query = data?.query || undefined;
  const author = data?.author || undefined;

  return useStickySWR(
    `/series?${buildQueryParams({
      page,
      query,
      author,
    })}`,
    fetcher,
    {},
  );
};
