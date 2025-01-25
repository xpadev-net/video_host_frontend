import axios from "axios";

import { AuthTokenLocalStorageKey } from "@/atoms/Auth";
import { ApiEndpoint } from "@/contexts/env";

const token =
  typeof window == "undefined"
    ? null
    : localStorage.getItem(AuthTokenLocalStorageKey);

export const requests = axios.create({
  baseURL: ApiEndpoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token.slice(1, -1)}` : undefined,
  },
});
