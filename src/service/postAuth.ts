import { AxiosError, AxiosResponse } from "axios";

import { v4PostAuthLoginRes } from "@/@types/v4Api";
import { requests } from "@/libraries/requests";

export const postAuth = async (username: string, password: string) => {
  try {
    return await requests.post<v4PostAuthLoginRes>(
      "/auth",
      {
        username,
        password,
        type: "password",
      },
      {},
    );
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      return e.response as AxiosResponse<v4PostAuthLoginRes, unknown>;
    }
    throw e;
  }
};
