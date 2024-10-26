import { AxiosError, AxiosResponse } from "axios";

import { v4PostUsersRes } from "@/@types/v4Api";
import { requests } from "@/libraries/requests";

export const postUsers = async (
  username: string,
  name: string,
  password: string,
  signupCode: string,
) => {
  try {
    return await requests.post<v4PostUsersRes>(
      "/users",
      {
        username,
        name,
        password,
        signupCode,
      },
      {},
    );
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      return e.response as AxiosResponse<v4PostUsersRes, unknown>;
    }
    throw e;
  }
};
