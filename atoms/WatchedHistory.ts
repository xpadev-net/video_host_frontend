import {WatchedHistory} from "@/@types/WatchedHistory";
import {atomWithStorage} from "jotai/utils";

const watchedHistoryAtom = atomWithStorage<WatchedHistory>("WatchedHistory",{});

export {watchedHistoryAtom};