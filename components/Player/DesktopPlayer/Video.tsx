import { useAtom } from "jotai";
import { PlayerConfigAtom, VideoMetadataAtom } from "@/atoms/Player";
import { RefObject, useEffect } from "react";
import { MovieItemSource } from "@/@types/api";
import Hls from "hls.js";

type props = {
  className?: string;
  source?: MovieItemSource;
  videoRef: RefObject<HTMLVideoElement>;
};

const Video = ({ className, videoRef, source }: props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);

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
  };

  const setIsNotLoading = () => setMetadata({ ...metadata, isLoading: false });
  const onVideoSeeking = () => setMetadata({ ...metadata, isLoading: true });

  useEffect(() => {
    if (!videoRef.current) return;
    if (!source) {
      videoRef.current.srcObject = null;
      return;
    }
    if (playerConfig.isHls) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = source.http;
        videoRef.current.crossOrigin = "use-credentials";
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: function (xhr, url) {
            xhr.withCredentials = true;
            xhr.open("GET", url);
          },
        });
        hls.loadSource(source.hls);
        hls.attachMedia(videoRef.current);
        videoRef.current.crossOrigin = "anonymous";
      } else {
        console.error(
          "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
        );
      }
    } else {
      videoRef.current.src = source.http;
      videoRef.current.crossOrigin = "use-credentials";
    }
    videoRef.current.playbackRate = playerConfig.playbackRate;
  }, [videoRef.current, source]);

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
      onCanPlay={setIsNotLoading}
      onSeeking={onVideoSeeking}
      onSeeked={setIsNotLoading}
    />
  );
};

export { Video };
