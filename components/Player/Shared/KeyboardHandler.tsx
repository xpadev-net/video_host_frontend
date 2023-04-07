import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  MovieItemAtom,
  PlayerConfigAtom,
  VideoMetadataAtom,
  VideoRefAtom,
} from "@/atoms/Player";
import { useRouter } from "next/router";

const rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];

const KeyboardHandler = () => {
  const videoRef = useAtomValue(VideoRefAtom);
  const movieItem = useAtomValue(MovieItemAtom);
  const setPlayerConfig = useSetAtom(PlayerConfigAtom);
  const setVideoMetadata = useSetAtom(VideoMetadataAtom);
  const router = useRouter();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!videoRef || !movieItem) return;
      if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        videoRef.currentTime += 5 * (e.code === "ArrowRight" ? 1 : -1);
        return;
      }
      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        const volume = videoRef.volume + 0.1 * (e.code === "ArrowUp" ? 1 : -1);
        videoRef.volume = Math.min(1, Math.max(0, volume));
        return;
      }
      if ((e.code === "Period" || e.code === "Comma") && e.shiftKey) {
        const key =
          rates.indexOf(videoRef.playbackRate) + (e.code === "Period" ? 1 : -1);
        if (!rates[key]) return;
        videoRef.playbackRate = rates[key];
        return;
      }
      if (e.code === "Space" || e.code === "KeyK") {
        void (videoRef.paused ? videoRef.play() : videoRef.pause());
        return;
      }
      if ((e.code === "KeyN" || e.code === "KeyP") && e.shiftKey) {
        const item = movieItem[e.code === "KeyN" ? "next" : "prev"];
        if (!item) return;
        void router.push(`/movie/${item.url}`);
        return;
      }
      if (e.code === "KeyT") {
        setPlayerConfig((prev) => ({ ...prev, isTheatre: !prev.isTheatre }));
        return;
      }
      if (e.code === "KeyF" || e.code === "Escape") {
        setVideoMetadata((prev) => ({
          ...prev,
          isFullscreen: e.code === "KeyF" ? !prev.isFullscreen : false,
        }));
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [videoRef, movieItem]);

  return <></>;
};

export { KeyboardHandler };
