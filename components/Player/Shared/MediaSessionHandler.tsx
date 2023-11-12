import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { MovieItemAtom, VideoRefAtom } from "@/atoms/Player";
import { ApiEndpoint } from "@/contexts/env";

const MediaSessionHandler = () => {
  const movieItem = useAtomValue(MovieItemAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const router = useRouter();

  const mediaSessionHandler: {
    [key: string]: MediaSessionActionHandler | null;
  } = {
    seekbackward: () => {
      if (!videoRef) return;
      const time = videoRef.currentTime - 5;
      if (time < 0) {
        videoRef.currentTime = 0;
      } else {
        videoRef.currentTime -= 5;
      }
    },
    seekforward: () => {
      if (!videoRef) return;
      const time = videoRef.currentTime + 5;
      if (time > videoRef.duration) {
        videoRef.currentTime = videoRef.duration;
      } else {
        videoRef.currentTime += 5;
      }
    },
    nexttrack: movieItem?.next
      ? () => {
          if (!movieItem?.next) return;
          void router.push(movieItem.next.url);
        }
      : null,
    previoustrack: movieItem?.prev
      ? () => {
          if (!movieItem?.prev) return;
          void router.push(movieItem.prev.url);
        }
      : null,
  };

  useEffect(() => {
    if (!movieItem) {
      navigator.mediaSession.metadata = null;
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: movieItem.movie.title,
      artist: movieItem.movie.seriesTitle,
      artwork: [
        {
          src: `${ApiEndpoint}/img/${movieItem.movie.url}`,
          sizes: "256x256",
          type: "image/jpg",
        },
      ],
    });
    for (const key of Object.keys(mediaSessionHandler)) {
      const handler = mediaSessionHandler[key];
      navigator.mediaSession.setActionHandler(
        key as MediaSessionAction,
        handler,
      );
    }
    return () => {
      navigator.mediaSession.metadata = null;
    };
  }, [movieItem, videoRef]);

  useEffect(() => {
    if (!videoRef) return;
    const handler = () => {
      if (!videoRef || isNaN(videoRef.duration)) return;
      navigator.mediaSession.setPositionState({
        duration: videoRef.duration,
        position: videoRef.currentTime,
        playbackRate: videoRef.playbackRate,
      });
    };
    videoRef.addEventListener("timeupdate", handler);
    return () => {
      videoRef.removeEventListener("timeupdate", handler);
    };
  }, [videoRef]);

  return <></>;
};

export { MediaSessionHandler };
