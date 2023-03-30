import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  MovieItemAtom,
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  VideoMetadataAtom,
  VideoRefAtom,
} from "@/atoms/Player";
import { useEffect, useRef, useState } from "react";
import { request } from "@/libraries/request";
import { CommentResponse } from "@/@types/api";
import NiconiComments from "@xpadev-net/niconicomments";
import Styles from "@/components/Player/DesktopPlayer/DesktopPlayer.module.scss";
import Hls from "hls.js";
import { LoadingIcon } from "@/assets/LoadingIcon";
import { Controller } from "@/components/Player/DesktopPlayer/Controller/Controller";

const DesktopPlayer = () => {
  const data = useAtomValue(MovieItemAtom);
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const niconicommentsRef = useRef<NiconiComments>();
  const niconicommentsConfig = useAtomValue(NiconicommentsConfigAtom);
  const commentSmoothingRef = useRef({ offset: 0, timestamp: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isAfk, setIsAfk] = useState(false);
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const afkTimeout = useRef(-1);

  const onPipPause = () => {
    void (async () => {
      if (videoRef.current?.paused) {
        await videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
      await pipVideoRef.current?.play();
    })();
  };

  useEffect(() => {
    setVideoAtom(videoRef.current);
    if (videoRef.current && playerConfig.volume !== videoRef.current.volume) {
      setPlayerConfig({ ...playerConfig, volume: videoRef.current.volume });
    }
  }, [videoRef, playerConfig]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!videoRef.current || !canvas || !pipVideoRef.current) return;
    if (!data) {
      videoRef.current.srcObject = null;
      return;
    }
    if (playerConfig.isHls) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = data.source.http;
        videoRef.current.crossOrigin = "use-credentials";
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: function (xhr, url) {
            xhr.withCredentials = true;
            xhr.open("GET", url);
          },
        });
        hls.loadSource(data.source.hls);
        hls.attachMedia(videoRef.current);
        videoRef.current.crossOrigin = "anonymous";
      } else {
        console.error(
          "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
        );
      }
    } else {
      videoRef.current.src = data.source.http;
      videoRef.current.crossOrigin = "use-credentials";
    }
    videoRef.current.playbackRate = playerConfig.playbackRate;
    void (async () => {
      const res = await request<CommentResponse>(
        `/comments/${data.movie.url}/`
      );
      if (res.status !== "success") return;
      const video = playerConfig.isPipEnable
        ? videoRef.current || undefined
        : undefined;
      niconicommentsRef.current = new NiconiComments(
        canvas,
        [{ comments: res.comments, id: "0", fork: "main", commentCount: 0 }],
        { ...niconicommentsConfig, video }
      );
      setIsLoading(false);
    })();
    const interval = window.setInterval(() => {
      const vposMs = videoRef.current?.paused
        ? Math.floor(videoRef.current.currentTime * 1000)
        : performance.now() -
          commentSmoothingRef.current.timestamp +
          commentSmoothingRef.current.offset * 1000;
      niconicommentsRef.current?.drawCanvas(Math.floor(vposMs / 10));
    }, 1);
    return () => {
      window.clearInterval(interval);
    };
  }, [videoRef.current, canvasRef.current, pipVideoRef.current, data?.source]);

  useEffect(() => {
    if (!niconicommentsRef.current) return;
    niconicommentsRef.current.video = playerConfig.isPipEnable
      ? videoRef.current || undefined
      : undefined;
  }, [playerConfig.isPipEnable]);

  const onVideoPlay = () => {
    commentSmoothingRef.current = {
      offset: videoRef.current?.currentTime || 0,
      timestamp: performance.now(),
    };
    setMetadata({ ...metadata, paused: false });
  };

  const onVideoRateChange = () => {
    if (
      videoRef.current &&
      videoRef.current.playbackRate !== playerConfig.playbackRate
    ) {
      videoRef.current.playbackRate = playerConfig.playbackRate;
    }
  };

  const onMouseMove = () => {
    window.clearTimeout(afkTimeout.current);
    setIsAfk(false);
    afkTimeout.current = window.setTimeout(() => {
      setIsAfk(true);
    }, 3000);
  };

  const onVideoPause = () => {
    setMetadata({ ...metadata, paused: true });
  };

  const togglePlayerState = () => {
    if (videoRef.current?.paused) {
      void videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const onVideoVolumeChange = () => {
    setPlayerConfig({ ...playerConfig, volume: videoRef.current?.volume || 0 });
  };

  const onVideoLoadedMetadata = () => {
    setMetadata({ ...metadata, duration: videoRef.current?.duration || 0 });
  };

  const onVideoTimeUpdate = () => {
    setMetadata({
      ...metadata,
      currentTime: videoRef.current?.currentTime || 0,
    });
  };

  return (
    <div
      className={`${Styles.wrapper} ${
        isAfk && !metadata.paused && Styles.inactive
      }`}
      onMouseMove={onMouseMove}
      onClick={togglePlayerState}
    >
      {isLoading && (
        <div className={Styles.loadingWrapper}>
          <LoadingIcon className={Styles.icon} />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={Styles.canvas}
        width={1920}
        height={1080}
      />
      <video
        ref={videoRef}
        className={Styles.video}
        onPlay={onVideoPlay}
        onRateChange={onVideoRateChange}
        onPause={onVideoPause}
        onVolumeChange={onVideoVolumeChange}
        onLoadedMetadata={onVideoLoadedMetadata}
        onTimeUpdate={onVideoTimeUpdate}
      />
      <video
        className={`${Styles.pipVideo} ${
          playerConfig.isPipEnable && Styles.active
        }`}
        ref={pipVideoRef}
        autoPlay={true}
        muted={true}
        onPause={onPipPause}
      />
      <Controller className={Styles.controller} />
    </div>
  );
};

export { DesktopPlayer };
