import { AxiosError, type AxiosResponse } from "axios";

import type { v4DeleteAuthLogoutRes } from "@/@types/v4Api";
import { requests } from "@/libraries/requests";

export const deleteAuth = async () => {
  try {
    const res = await requests.delete<v4DeleteAuthLogoutRes>("/auth");
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      return e.response as AxiosResponse<v4DeleteAuthLogoutRes, unknown>;
    }
    throw e;
  }
};
