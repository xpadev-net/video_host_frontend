import { useAtomValue } from "jotai";
import {
  FastForward,
  Pause,
  Play,
  Rabbit,
  Rewind,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import {
  PlayerPlaybackRateAtom,
  PlayerPlayPauseNotificationAtom,
  PlayerSeekNotificationAtom,
  PlayerVolumeAtom,
} from "@/atoms/Player";
import { useTemporaryVisible } from "@/hooks/useTemporaryVisible";

type StatusType = "playbackRate" | "volume" | "seek" | "playPause";

interface StatusInfo {
  type: StatusType;
  value: ReactNode;
}

const PlayerStatusDisplay = () => {
  const playbackRate = useAtomValue(PlayerPlaybackRateAtom);
  const volume = useAtomValue(PlayerVolumeAtom);
  const seekNotification = useAtomValue(PlayerSeekNotificationAtom);
  const playPauseNotification = useAtomValue(PlayerPlayPauseNotificationAtom);
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
        value: (
          <div className="flex items-center justify-center gap-2">
            <Rabbit size={24} />
            <span>{playbackRate}x</span>
          </div>
        ),
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
        value: (
          <div className="flex items-center justify-center gap-2">
            {volume === 0 ? (
              <VolumeX size={24} />
            ) : volume < 0.5 ? (
              <Volume1 size={24} />
            ) : (
              <Volume2 size={24} />
            )}
            <span>{Math.round(volume * 100)}%</span>
          </div>
        ),
      });
      show();
      previousVolume.current = volume;
    }
  }, [volume, show]);

  useEffect(() => {
    if (seekNotification) {
      setCurrentStatus({
        type: "seek",
        value: (
          <div className="flex items-center justify-center gap-2">
            {seekNotification.direction === "backward" && <Rewind size={24} />}
            <span>{seekNotification.seconds}秒</span>
            {seekNotification.direction === "forward" && (
              <FastForward size={24} />
            )}
          </div>
        ),
      });
      show();
    }
  }, [seekNotification, show]);

  useEffect(() => {
    if (playPauseNotification) {
      setCurrentStatus({
        type: "playPause",
        value: (
          <div className="flex items-center justify-center gap-2">
            {playPauseNotification.action === "play" ? (
              <Play size={32} />
            ) : (
              <Pause size={32} />
            )}
          </div>
        ),
      });
      show();
    }
  }, [playPauseNotification, show]);

  if (!currentStatus) {
    return null;
  }

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-black/50 text-white px-5 py-3 rounded-lg text-lg font-bold text-center w-32 mx-auto">
        {currentStatus.value}
      </div>
    </div>
  );
};

export { PlayerStatusDisplay };
