import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { v4GetUserRes } from "@/@types/v4Api";
import { AuthTokenAtom } from "@/atoms/Auth";
import { useStickySWR } from "@/hooks/useStickySWR";
import { requests } from "@/libraries/requests";

const fetcher = async (key?: string): Promise<v4GetUserRes> => {
  if (!key)
    return Promise.resolve({
      status: "error",
      code: 404,
      message: "not found",
    });
  const res = await requests.get<v4GetUserRes>(`/users/${key}`);
  return res.data;
};

export const useUser = (query?: string) => {
  const swr = useStickySWR(query, fetcher, {});
  const token = useAtomValue(AuthTokenAtom);
  useEffect(() => {
    void swr.mutate();
  }, [token]);
  return swr;
};

export const useSelf = () => {
  const swr = useStickySWR("me", fetcher, {});
  const token = useAtomValue(AuthTokenAtom);
  useEffect(() => {
    void swr.mutate();
  }, [token]);
  return swr;
};
