import useSWRInfinite from "swr/infinite";

import type { v4GetMoviesRes } from "@/@types/v4Api";
import { requests } from "@/libraries/requests";
import { buildQueryParams } from "@/utils/buildQueryParams";

const fetcher = async (key: string): Promise<v4GetMoviesRes> => {
  const res = await requests.get<v4GetMoviesRes>(key);
  return res.data;
};

type Props = {
  query?: string;
  author?: string;
};

export const useMovies = (params?: Props) => {
  const getKey = (
    pageIndex: number,
    previousPageData: v4GetMoviesRes | null,
  ) => {
    // データが空配列ならこれ以上取得しない
    if (
      previousPageData &&
      previousPageData.status === "ok" &&
      !previousPageData.data.pagination.hasNext
    )
      return null;
    return `/movies?${buildQueryParams({
      page: pageIndex + 1,
      query: params?.query,
      author: params?.author,
    })}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<
    v4GetMoviesRes,
    unknown
  >(getKey, fetcher);

  // 全ページのデータをフラット化
  const movies =
    (
      data?.flatMap((page) => (page.status === "ok" ? page.data.items : [])) ??
      []
    ).filter((item) => item.duration > 0) || [];
  const lastPage = data?.[size - 1];
  const hasNext = lastPage?.status !== "ok" || lastPage.data.pagination.hasNext;
  return {
    movies,
    error,
    size,
    setSize,
    hasNext,
    isValidating,
  };
};
