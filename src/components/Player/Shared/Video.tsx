import Hls from "hls.js";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { RefObject, useEffect, useRef, useState } from "react";

import { MovieItem } from "@/@types/api";
import {
  PlayerConfigAtom,
  PlayerStateAtom,
  VideoMetadataAtom,
} from "@/atoms/Player";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";

type props = {
  className?: string;
  movie?: MovieItem;
  videoRef: RefObject<HTMLVideoElement>;
};

const Video = ({ className, videoRef, movie }: props) => {
  const setMetadata = useSetAtom(VideoMetadataAtom);
  const setState = useSetAtom(PlayerStateAtom);
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [watchedHistory, setWatchedHistory] = useAtom(watchedHistoryAtom);
  const [url, setUrl] = useState<string>("");

  const hlsRef = useRef<Hls>();

  const router = useRouter();

  const onVideoPlay = () => {
    setState((pv) => ({ ...pv, paused: false }));
  };

  const onVideoPause = () => {
    setState((pv) => ({ ...pv, paused: true }));
  };

  const onVideoVolumeChange = () => {
    setPlayerConfig({ ...playerConfig, volume: videoRef.current?.volume || 0 });
  };

  const onVideoLoadedMetadata = () => {
    setMetadata((pv) => ({
      ...pv,
      duration: videoRef.current?.duration || 0,
    }));
    setState((pv) => ({ ...pv, paused: true, isLoading: true }));
    void videoRef.current?.play().catch();
  };

  const onVideoRateChange = () => {
    if (
      videoRef.current &&
      videoRef.current.playbackRate !== playerConfig.playbackRate
    ) {
      videoRef.current.playbackRate = playerConfig.playbackRate;
    }
  };

  const onVideoTimeUpdate = () => {
    setMetadata((pv) => ({
      ...pv,
      currentTime: videoRef.current?.currentTime || 0,
    }));
    if (
      videoRef.current &&
      Math.floor(videoRef.current.currentTime) % 10 === 0 &&
      movie
    ) {
      setWatchedHistory({
        ...watchedHistory,
        [movie.movie.url]: {
          movie: movie,
          watched: videoRef.current.currentTime / videoRef.current.duration,
        },
      });
    }
  };

  const onVideoEnded = () => {
    if (!playerConfig.autoPlay || !movie?.next) return;
    void router.push(`/movie/${movie.next.url}`);
  };

  const onVideoCanPlay = () => {
    setState((pv) => ({ ...pv, isLoading: false }));
  };

  const onVideoSeeked = () => setState((pv) => ({ ...pv, isLoading: false }));
  const onVideoSeeking = () => setState((pv) => ({ ...pv, isLoading: true }));

  useEffect(() => {
    if (!videoRef.current) return;
    if (!movie?.source) {
      videoRef.current.srcObject = null;
      return;
    }
    const setup = () => {
      if (!videoRef.current) return;
      if (playerConfig.isHls) {
        if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
          videoRef.current.src = movie.source.http;
          videoRef.current.crossOrigin = movie.source.anonymous
            ? ""
            : "use-credentials";
        } else if (Hls.isSupported()) {
          const hls = new Hls({
            xhrSetup: function (xhr, url) {
              xhr.withCredentials = !movie.source.anonymous;
              xhr.open("GET", url);
            },
            enableWorker: true,
            lowLatencyMode: true,
          });
          hls.loadSource(movie.source.hls);
          hls.attachMedia(videoRef.current);
          hlsRef.current = hls;
          videoRef.current.crossOrigin = "anonymous";
        } else {
          console.error(
            "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API",
          );
        }
      } else {
        videoRef.current.src = movie.source.http;
        videoRef.current.crossOrigin = movie.source.anonymous
          ? ""
          : "use-credentials";
        videoRef.current.load();
      }
      videoRef.current.playbackRate = playerConfig.playbackRate;
      videoRef.current.volume = playerConfig.volume;
    };

    if (movie.movie.url === url) {
      const currentTIme = videoRef.current.currentTime;
      setup();
      videoRef.current.currentTime = currentTIme;
    } else {
      setWatchedHistory({
        ...watchedHistory,
        [movie.movie.url]: {
          movie: movie,
          watched: 0,
        },
      });
      setup();
    }
    setUrl(movie.movie.url);
    return () => {
      hlsRef.current?.destroy();
    };
  }, [videoRef.current, movie?.source, playerConfig.isHls]);

  return (
    <video
      ref={videoRef}
      className={className}
      onPlay={onVideoPlay}
      onRateChange={onVideoRateChange}
      onPause={onVideoPause}
      onVolumeChange={onVideoVolumeChange}
      onLoadedMetadata={onVideoLoadedMetadata}
      onTimeUpdate={onVideoTimeUpdate}
      onCanPlay={onVideoCanPlay}
      onSeeking={onVideoSeeking}
      onSeeked={onVideoSeeked}
      onEnded={onVideoEnded}
    />
  );
};

export { Video };
