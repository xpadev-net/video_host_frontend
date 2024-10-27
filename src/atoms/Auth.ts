import { atom } from "jotai";

import { requests } from "@/libraries/requests";

export const AuthModalOpenAtom = atom<boolean>(false);
export const AuthTokenAtom = atom<
  string | null,
  (string | null)[],
  string | null
>(null, (get, set, token) => {
  if (token) {
    requests.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete requests.defaults.headers["Authorization"];
  }
  set(AuthTokenAtom, token);
  return token;
});
