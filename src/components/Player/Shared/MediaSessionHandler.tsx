import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { type FC, useEffect, useMemo } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { VideoRefAtom } from "@/atoms/Player";
import { findNext, findPrev } from "@/components/Player/utils/findPrevNext";

type Props = {
  data: FilteredMovie;
};

const MediaSessionHandler: FC<Props> = ({ data }) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const router = useRouter();

  const next = useMemo(() => findNext(data), [data]);
  const prev = useMemo(() => findPrev(data), [data]);

  const mediaSessionHandler: {
    [key: string]: MediaSessionActionHandler | null;
  } = useMemo(
    () => ({
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
      nexttrack: next
        ? () => {
            if (!next) return;
            void router.push(`/movies/${next.id}`);
          }
        : null,
      previoustrack: prev
        ? () => {
            if (!prev) return;
            void router.push(`/movies/${prev.id}`);
          }
        : null,
    }),
    [videoRef, next, prev, router],
  );

  useEffect(() => {
    if (!data) {
      navigator.mediaSession.metadata = null;
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.title,
      artist: data.series?.title,
      artwork: data.thumbnailUrl
        ? [
            {
              src: data.thumbnailUrl,
              sizes: "256x256",
              type: "image/jpg",
            },
          ]
        : [],
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
  }, [data, mediaSessionHandler]);

  useEffect(() => {
    if (!videoRef) return;
    const handler = () => {
      if (!videoRef || Number.isNaN(videoRef.duration)) return;
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

  return null;
};

export { MediaSessionHandler };
