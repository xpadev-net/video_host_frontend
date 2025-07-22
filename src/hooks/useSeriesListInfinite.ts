import useSWRInfinite from "swr/infinite";

import type { v4GetSeriesListRes } from "@/@types/v4Api";
import { requests } from "@/libraries/requests";
import { buildQueryParams } from "@/utils/buildQueryParams";

const fetcher = async (key: string): Promise<v4GetSeriesListRes> => {
  const res = await requests.get<v4GetSeriesListRes>(key);
  return res.data;
};

type Props = {
  query?: string;
  author?: string;
};

export const useSeriesListInfinite = (params?: Props) => {
  const getKey = (
    pageIndex: number,
    previousPageData: v4GetSeriesListRes | null,
  ) => {
    // データが空配列ならこれ以上取得しない
    if (
      previousPageData &&
      previousPageData.status === "ok" &&
      !previousPageData.data.pagination.hasNext
    )
      return null;
    return `/series?${buildQueryParams({
      page: pageIndex + 1,
      query: params?.query,
      author: params?.author,
    })}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<
    v4GetSeriesListRes,
    unknown
  >(getKey, fetcher);

  // 全ページのデータをフラット化
  const series =
    data?.flatMap((page) => (page.status === "ok" ? page.data.items : [])) ??
    [];
  const lastPage = data?.[size - 1];
  const hasNext = lastPage?.status !== "ok" || lastPage.data.pagination.hasNext;
  return {
    series,
    error,
    size,
    setSize,
    hasNext,
    isValidating,
  };
};
