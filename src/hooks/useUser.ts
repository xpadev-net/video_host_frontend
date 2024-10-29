import { AxiosError } from "axios";
import { useAtom } from "jotai";
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
  try {
    const res = await requests.get<v4GetUserRes>(`/users/${key}`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      return e.response.data as v4GetUserRes;
    }
    throw e;
  }
};

export const useUser = (query?: string) => {
  return useStickySWR(query, fetcher, {});
};

export const useSelf = () => {
  const swr = useStickySWR("me", fetcher, {});
  const [token, setToken] = useAtom(AuthTokenAtom);
  useEffect(() => {
    void swr.mutate();
  }, [token]);

  useEffect(() => {
    if (swr.data && swr.data.code === 401) {
      setToken(null);
    }
  }, [swr.data]);

  return swr;
};
