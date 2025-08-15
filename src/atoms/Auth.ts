import { atomWithStorage } from "jotai/utils";

export const AuthTokenLocalStorageKey = "token";

export const AuthTokenAtom = atomWithStorage<string | null>(
  AuthTokenLocalStorageKey,
  null,
);
