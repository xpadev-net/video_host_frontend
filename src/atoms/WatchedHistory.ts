import { atomWithStorage } from "jotai/utils";

import type { WatchedHistory } from "@/@types/WatchedHistory";

const watchedHistoryAtom = atomWithStorage<WatchedHistory>(
  "WatchedHistory",
  {},
);

export { watchedHistoryAtom };
