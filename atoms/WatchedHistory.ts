import {WatchedHistory} from "@/@types/WatchedHistory";
import {atomWithStorage} from "jotai/utils";

const watchedHistory = atomWithStorage<WatchedHistory>("WatchedHistory",{});

export {watchedHistory};