import { atomWithStorage } from "jotai/utils";

import { WatchedHistory } from "@/@types/WatchedHistory";

const watchedHistoryAtom = atomWithStorage<WatchedHistory>(
  "WatchedHistory",
  {},
);

export { watchedHistoryAtom };
