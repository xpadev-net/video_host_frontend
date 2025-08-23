import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

import { PlayerPlaybackRateAtom } from "@/atoms/Player";
import { useTemporaryVisible } from "@/hooks/useTemporaryVisible";

const PlaybackRateDisplay = () => {
  const playbackRate = useAtomValue(PlayerPlaybackRateAtom);
  const { visible, show } = useTemporaryVisible(1500);
  const previousPlaybackRate = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (previousPlaybackRate.current === undefined) {
      previousPlaybackRate.current = playbackRate;
      return;
    }
    if (previousPlaybackRate.current === playbackRate) {
      console.log("Playback rate changed to:", playbackRate);
      return;
    }
    show();
    previousPlaybackRate.current = playbackRate;
  }, [playbackRate, show]);

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-black/50 text-white px-5 py-3 rounded-lg text-lg font-bold text-center">
        {playbackRate}x
      </div>
    </div>
  );
};

export { PlaybackRateDisplay };
