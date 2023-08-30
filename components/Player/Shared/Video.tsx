import Hls from "hls.js";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { RefObject, useEffect, useState } from "react";

import { MovieItem } from "@/@types/api";
import { PlayerConfigAtom, VideoMetadataAtom } from "@/atoms/Player";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";

type props = {
  className?: string;
  movie?: MovieItem;
  videoRef: RefObject<HTMLVideoElement>;
};

const Video = ({ className, videoRef, movie }: props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [watchedHistory, setWatchedHistory] = useAtom(watchedHistoryAtom);
  const [url, setUrl] = useState<string>("");

  const router = useRouter();

  const onVideoPlay = () => {
    setMetadata({ ...metadata, paused: false });
  };

  const onVideoPause = () => {
    setMetadata({ ...metadata, paused: true });
  };

  const onVideoVolumeChange = () => {
    setPlayerConfig({ ...playerConfig, volume: videoRef.current?.volume || 0 });
  };

  const onVideoLoadedMetadata = () => {
    setMetadata({
      ...metadata,
      duration: videoRef.current?.duration || 0,
      paused: true,
      isLoading: true,
    });
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
    setMetadata({
      ...metadata,
      currentTime: videoRef.current?.currentTime || 0,
    });
    if (
      videoRef.current &&
      Math.floor(videoRef.current.currentTime) % 10 === 0 &&
      movie
    ) {
      setWatchedHistory({
        [movie.movie.url]: {
          movie: movie,
          watched: videoRef.current.currentTime / videoRef.current.duration,
        },
        ...watchedHistory,
      });
    }
  };

  const onVideoEnded = () => {
    if (!playerConfig.autoPlay || !movie?.next) return;
    void router.push(`/movie/${movie.next.url}`);
  };

  const onVideoCanPlay = () => {
    setMetadata({ ...metadata, isLoading: false });
  };

  const onVideoSeeked = () => setMetadata({ ...metadata, isLoading: false });
  const onVideoSeeking = () => setMetadata({ ...metadata, isLoading: true });

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
          videoRef.current.crossOrigin = "anonymous";
        } else {
          console.error(
            "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
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
