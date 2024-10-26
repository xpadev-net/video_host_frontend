import { atom } from "jotai";

export const AuthModalOpenAtom = atom<boolean>(false);
export const AuthTokenAtom = atom<string | null>(null);
