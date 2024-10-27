import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const AuthModalOpenAtom = atom<boolean>(false);
export const AuthTokenAtom = atomWithStorage<string | null>("token", null);
