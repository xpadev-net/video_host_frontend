import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { PlayerPlaybackRateAtom } from "@/atoms/Player";

const PlaybackRateDisplay = () => {
  const playbackRate = useAtomValue(PlayerPlaybackRateAtom);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    console.log("Playback rate changed to:", playbackRate);

    const timer = setTimeout(() => {
      setVisible(false);
      console.log("Playback rate display hidden");
    }, 1500);

    return () => {
      clearTimeout(timer);
      setVisible(false);
      console.log("Playback rate display cleared");
    };
  }, [playbackRate]);

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
