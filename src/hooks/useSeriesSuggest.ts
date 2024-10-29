import { v4GetSeriesListRes } from "@/@types/v4Api";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (key: string): Promise<v4GetSeriesListRes> => {
  if (key.length < 2) {
    return {
      status: "ok",
      code: 200,
      data: [],
    };
  }
  const urlSearchParam = new URLSearchParams({
    query: key,
    suggest: "1",
  }).toString();
  const res = await requests.get<v4GetSeriesListRes>(
    `/series/?${urlSearchParam}`,
  );
  return res.data;
};

type Props = {
  query: string;
};

export const useSeriesSuggest = (data?: Props) => {
  return useStickySWR(data?.query, fetcher, {});
};
