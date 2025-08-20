import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FilteredMovie } from "@/@types/v4Api";
import { LoadingIcon } from "@/assets/LoadingIcon";
import {
  PlayerConfigAtom,
  PlayerStateAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { CommentCanvas } from "@/components/Player/Shared/CommentCanvas";
import { KeyboardHandler } from "@/components/Player/Shared/KeyboardHandler";
import { MediaSessionHandler } from "@/components/Player/Shared/MediaSessionHandler";
import { Video } from "@/components/Player/Shared/Video";
import { EnableComments } from "@/contexts/env";
import { Controller } from "./Controller";
import Styles from "./DesktopPlayer.module.scss";

type props = {
  className?: string;
  data: FilteredMovie;
};

const DesktopPlayer = ({ className, data }: props) => {
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const setWrapperAtom = useSetAtom(WrapperRefAtom);
  const { isPipEnable, isTheatre, isNiconicommentsEnable } =
    useAtomValue(PlayerConfigAtom);
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const [isAfk, setIsAfk] = useState(false);
  const afkTimeout = useRef(-1);
  const state = useAtomValue(PlayerStateAtom);

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
  }, [setVideoAtom, setWrapperAtom]);

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
    <button
      className={`${className} ${Styles.wrapper} ${
        isTheatre && !state.isFullscreen && Styles.theatre
      } ${state.isFullscreen && Styles.fullscreen} ${
        isAfk && !state.paused && !state.isSetting && Styles.inactive
      }`}
      onMouseMove={onMouseMove}
      onClick={togglePlayerState}
      type="button"
      tabIndex={0}
      aria-label={state.paused ? "Play video" : "Pause video"}
      ref={wrapperRef}
    >
      {state.isLoading && data && (
        <>
          <div
            className={
              "absolute z-20 left-0 top-0 w-full h-full bg-black opacity-50 grid place-items-center pointer-events-none"
            }
          >
            <LoadingIcon className={Styles.icon} />
          </div>
          {data.thumbnailUrl && (
            <Image
              src={data.thumbnailUrl}
              width={720}
              height={480}
              alt={""}
              className={"absolute z-10 left-0 top-0 w-full h-full"}
            />
          )}
        </>
      )}
      <div className={Styles.videoWrapper}>
        {isNiconicommentsEnable && EnableComments && (
          <CommentCanvas
            key={data?.id}
            url={data?.id}
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
      <Controller className={Styles.controller} data={data} />
      <KeyboardHandler data={data} />
      <MediaSessionHandler data={data} />
    </button>
  );
};

export { DesktopPlayer };
