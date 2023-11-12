import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { LoadingIcon } from "@/assets/LoadingIcon";
import {
  MovieItemAtom,
  PlayerConfigAtom,
  VideoMetadataAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { CommentCanvas } from "@/components/Player/Shared/CommentCanvas";
import { KeyboardHandler } from "@/components/Player/Shared/KeyboardHandler";
import { MediaSessionHandler } from "@/components/Player/Shared/MediaSessionHandler";
import { Video } from "@/components/Player/Shared/Video";
import { ApiEndpoint, EnableComments } from "@/contexts/env";

import { Controller } from "./Controller";
import Styles from "./DesktopPlayer.module.scss";

type props = {
  className?: string;
};

const DesktopPlayer = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const setWrapperAtom = useSetAtom(WrapperRefAtom);
  const { isPipEnable, isTheatre, isNiconicommentsEnable } =
    useAtomValue(PlayerConfigAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const [isAfk, setIsAfk] = useState(false);
  const afkTimeout = useRef(-1);
  const metadata = useAtomValue(VideoMetadataAtom);

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
  }, [videoRef, wrapperRef]);

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
        isTheatre && !metadata.isFullscreen && Styles.theatre
      } ${metadata.isFullscreen && Styles.fullscreen} ${
        isAfk && !metadata.paused && !metadata.isSetting && Styles.inactive
      }`}
      onMouseMove={onMouseMove}
      onClick={togglePlayerState}
      ref={wrapperRef}
    >
      {metadata.isLoading && data && (
        <>
          <div
            className={Styles.loadingWrapper}
            onClick={(e) => e.preventDefault()}
          >
            <LoadingIcon className={Styles.icon} />
          </div>
          <img
            src={`${ApiEndpoint}/img/${data.movie.url}`}
            alt={""}
            className={Styles.thumbnail}
          />
        </>
      )}
      <div className={Styles.videoWrapper}>
        {isNiconicommentsEnable && EnableComments && (
          <CommentCanvas
            key={data?.movie.url}
            url={data?.movie.url}
            className={Styles.canvas}
            videoRef={videoRef.current}
            pipVideoRef={pipVideoRef.current}
          />
        )}
        <Video className={Styles.video} videoRef={videoRef} movie={data} />
        <video
          className={`${Styles.pipVideo} ${
            isPipEnable && EnableComments && Styles.active
          }`}
          ref={pipVideoRef}
          autoPlay={true}
          muted={true}
          onPause={onPipPause}
        />
      </div>
      <Controller className={Styles.controller} />
      <KeyboardHandler />
      <MediaSessionHandler />
    </div>
  );
};

export { DesktopPlayer };
