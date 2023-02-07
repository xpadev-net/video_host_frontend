import {WatchedHistory} from "@/@types/WatchedHistory";
import {atomWithStorage} from "jotai/vanilla/utils/atomWithStorage";

const watchedHistory = atomWithStorage<WatchedHistory>("WatchedHistory",{});

export {watchedHistory};