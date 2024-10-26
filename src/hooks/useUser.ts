import { v4GetUserRes } from "@/@types/v4Api";
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
  return useStickySWR(query, fetcher, {});
};

export const useSelf = () => {
  return useStickySWR("me", fetcher, {});
};
