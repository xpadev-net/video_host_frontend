import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { PlayerPlaybackRateAtom, PlayerVolumeAtom } from "@/atoms/Player";
import { useTemporaryVisible } from "@/hooks/useTemporaryVisible";

type StatusType = "playbackRate" | "volume";

interface StatusInfo {
  type: StatusType;
  value: string;
}

const PlayerStatusDisplay = () => {
  const playbackRate = useAtomValue(PlayerPlaybackRateAtom);
  const volume = useAtomValue(PlayerVolumeAtom);
  const { visible, show } = useTemporaryVisible(1500);
  const [currentStatus, setCurrentStatus] = useState<StatusInfo | null>(null);

  const previousPlaybackRate = useRef<number | undefined>(undefined);
  const previousVolume = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (previousPlaybackRate.current === undefined) {
      previousPlaybackRate.current = playbackRate;
      return;
    }
    if (previousPlaybackRate.current !== playbackRate) {
      setCurrentStatus({
        type: "playbackRate",
        value: `${playbackRate}x`,
      });
      show();
      previousPlaybackRate.current = playbackRate;
    }
  }, [playbackRate, show]);

  useEffect(() => {
    if (previousVolume.current === undefined) {
      previousVolume.current = volume;
      return;
    }
    if (previousVolume.current !== volume) {
      setCurrentStatus({
        type: "volume",
        value: `音量: ${Math.round(volume * 100)}%`,
      });
      show();
      previousVolume.current = volume;
    }
  }, [volume, show]);

  if (!currentStatus) {
    return null;
  }

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-black/50 text-white px-5 py-3 rounded-lg text-lg font-bold text-center">
        {currentStatus.value}
      </div>
    </div>
  );
};

export { PlayerStatusDisplay };
