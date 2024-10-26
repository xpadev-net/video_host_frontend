import {atomWithStorage} from "jotai/utils";

export const ThemeAtom = atomWithStorage<"dark"|"light"|"auto">("theme", "auto");