import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { type FC, useEffect } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import {
  PlayerConfigAtom,
  PlayerPlaybackRateAtom,
  PlayerStateAtom,
  VideoRefAtom,
} from "@/atoms/Player";
import { findNext, findPrev } from "@/components/Player/utils/findPrevNext";

const rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];

type Props = {
  data: FilteredMovie;
};

const KeyboardHandler: FC<Props> = ({ data }) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const [_playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const setPlaybackRate = useSetAtom(PlayerPlaybackRateAtom);
  const setVideoMetadata = useSetAtom(PlayerStateAtom);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!videoRef || !data) return false;
      if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        e.preventDefault();
        videoRef.currentTime += 5 * (e.code === "ArrowRight" ? 1 : -1);
        return true;
      }
      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        e.preventDefault();
        const volume = videoRef.volume + 0.1 * (e.code === "ArrowUp" ? 1 : -1);
        videoRef.volume = Math.min(1, Math.max(0, volume));
        return true;
      }
      if ((e.code === "Period" || e.code === "Comma") && e.shiftKey) {
        e.preventDefault();
        setPlaybackRate((prev) => {
          const key = rates.indexOf(prev) + (e.code === "Period" ? 1 : -1);
          if (!rates[key]) return prev;
          videoRef.playbackRate = rates[key];
          return rates[key];
        });
        return true;
      }
      if (e.code === "Space" || e.code === "KeyK") {
        e.preventDefault();
        void (videoRef.paused ? videoRef.play() : videoRef.pause());
        return true;
      }
      if ((e.code === "KeyN" || e.code === "KeyP") && e.shiftKey) {
        e.preventDefault();
        const item = e.code === "KeyN" ? findNext(data) : findPrev(data);
        if (!item) return false;
        void router.push(`/movie/${item.id}`);
        return true;
      }
      if (e.code === "KeyT") {
        e.preventDefault();
        setPlayerConfig((prev) => ({ ...prev, isTheatre: !prev.isTheatre }));
        return true;
      }
      if (e.code === "KeyF" || e.code === "Escape") {
        e.preventDefault();
        setVideoMetadata((prev) => ({
          ...prev,
          isFullscreen: e.code === "KeyF" ? !prev.isFullscreen : false,
        }));
        return true;
      }
      return false;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const result = handler(e);
      if (result) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    videoRef,
    data,
    setPlaybackRate,
    setPlayerConfig,
    setVideoMetadata,
    router.push,
  ]);

  return null;
};

export { KeyboardHandler };
