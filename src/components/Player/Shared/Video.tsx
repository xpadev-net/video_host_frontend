import Hls from "hls.js";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { AuthTokenAtom } from "@/atoms/Auth";
import {
  PlayerConfigAtom,
  PlayerStateAtom,
  PlayerVolumeAtom,
  VideoMetadataAtom,
} from "@/atoms/Player";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { findNext } from "@/components/Player/utils/findPrevNext";

type props = {
  className?: string;
  movie?: FilteredMovie;
  videoRef: RefObject<HTMLVideoElement>;
};

const Video = ({ className, videoRef, movie }: props) => {
  const setMetadata = useSetAtom(VideoMetadataAtom);
  const setState = useSetAtom(PlayerStateAtom);
  const token = useAtomValue(AuthTokenAtom);
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [configVolume, setConfigVolume] = useAtom(PlayerVolumeAtom);
  const setWatchedHistory = useSetAtom(watchedHistoryAtom);
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
    setConfigVolume(videoRef.current?.volume || 0);
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
    const ref = videoRef.current;
    if (ref && Math.floor(ref.currentTime) % 10 === 0 && movie) {
      setWatchedHistory((pv) => ({
        ...pv,
        [movie.id]: {
          movie: movie,
          watched: ref.currentTime / ref.duration,
        },
      }));
    }
  };

  const onVideoEnded = () => {
    if (!playerConfig.autoPlay || !movie) return;
    const next = findNext(movie);
    if (!next) return;
    void router.push(`/movies/${next.id}`);
  };

  const onVideoCanPlay = () => {
    setState((pv) => ({ ...pv, isLoading: false }));
  };

  const onVideoSeeked = () => setState((pv) => ({ ...pv, isLoading: false }));
  const onVideoSeeking = () => setState((pv) => ({ ...pv, isLoading: true }));

  const loadVideo = useCallback(
    (video: HTMLVideoElement, url: string) => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.crossOrigin = "use-credentials";
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
            xhr.open("GET", url);
            if (token) {
              xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            }
          },
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        hlsRef.current = hls;
        video.crossOrigin = "anonymous";
      } else {
        console.error(
          "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API",
        );
      }
      setPlayerConfig((pv) => ({ ...pv }));
    },
    [token, setPlayerConfig],
  );

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = playerConfig.playbackRate;
  }, [playerConfig, videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = configVolume;
  }, [configVolume, videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) return;
    const variant = movie?.variants[0];
    if (!variant) {
      videoRef.current.srcObject = null;
      return;
    }

    if (variant.contentUrl === url) {
      const currentTime = videoRef.current.currentTime;
      void loadVideo(videoRef.current, variant.contentUrl);
      videoRef.current.currentTime = currentTime;
    } else {
      setWatchedHistory((pv) => ({
        ...pv,
        [movie.id]: {
          movie: movie,
          watched: 0,
        },
      }));
      void loadVideo(videoRef.current, variant.contentUrl);
    }
    setUrl(variant.contentUrl);
    return () => {
      hlsRef.current?.destroy();
    };
  }, [videoRef.current, movie, setWatchedHistory, url, loadVideo]);

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
