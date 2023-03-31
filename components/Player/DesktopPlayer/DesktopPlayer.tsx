import { useAtomValue, useSetAtom } from "jotai";
import {
  MovieItemAtom,
  PlayerConfigAtom,
  VideoMetadataAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { useEffect, useRef, useState } from "react";
import Styles from "@/components/Player/DesktopPlayer/DesktopPlayer.module.scss";
import { LoadingIcon } from "@/assets/LoadingIcon";
import { Controller } from "@/components/Player/DesktopPlayer/Controller/Controller";
import { CommentCanvas } from "@/components/Player/DesktopPlayer/CommentCanvas";
import { Video } from "@/components/Player/DesktopPlayer/Video";

type props = {
  className?: string;
};

const DesktopPlayer = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const setWrapperAtom = useSetAtom(WrapperRefAtom);
  const playerConfig = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const [isAfk, setIsAfk] = useState(false);
  const metadata = useAtomValue(VideoMetadataAtom);
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
    setIsAfk(false);
    clearTimeout(afkTimeout.current);
    afkTimeout.current = window.setTimeout(() => {
      setIsAfk(true);
    }, 3000);
    return () => {
      clearTimeout(afkTimeout.current);
    };
  }, []);

  useEffect(() => {
    setVideoAtom(videoRef.current);
    setWrapperAtom(wrapperRef.current);
  }, [videoRef, playerConfig]);

  const onMouseMove = () => {
    window.clearTimeout(afkTimeout.current);
    setIsAfk(false);
    afkTimeout.current = window.setTimeout(() => {
      setIsAfk(true);
    }, 3000);
  };

  const togglePlayerState = () => {
    if (videoRef.current?.paused) {
      void videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  return (
    <div
      className={`${className} ${Styles.wrapper} ${
        isAfk && !metadata.paused && Styles.inactive
      }`}
      onMouseMove={onMouseMove}
      onClick={togglePlayerState}
      ref={wrapperRef}
    >
      <div className={Styles.videoWrapper}>
        {metadata.isLoading && (
          <div className={Styles.loadingWrapper}>
            <LoadingIcon className={Styles.icon} />
          </div>
        )}
        <CommentCanvas
          url={data?.movie.url}
          className={Styles.canvas}
          videoRef={videoRef.current}
          pipVideoRef={pipVideoRef.current}
        />
        <Video className={Styles.video} videoRef={videoRef} movie={data} />
        <video
          className={`${Styles.pipVideo} ${
            playerConfig.isPipEnable && Styles.active
          }`}
          ref={pipVideoRef}
          autoPlay={true}
          muted={true}
          onPause={onPipPause}
        />
      </div>
      <Controller className={Styles.controller} />
    </div>
  );
};

export { DesktopPlayer };
