import Styles from "@/components/Player/MobilePlayer/MobilePlayer.module.scss";
import { LoadingIcon } from "@/assets/LoadingIcon";
import { CommentCanvas } from "@/components/Player/Shared/CommentCanvas";
import { Video } from "@/components/Player/Shared/Video";
import { useAtomValue, useSetAtom } from "jotai";
import {
  MovieItemAtom,
  PlayerConfigAtom,
  VideoMetadataAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { useEffect, useRef, useState } from "react";
import { KeyboardHandler } from "@/components/Player/Shared/KeyboardHandler";
import { Controller } from "@/components/Player/MobilePlayer/Controller/Controller";
import { MediaSessionHandler } from "@/components/Player/Shared/MediaSessionHandler";

type props = {
  className?: string;
};

const MobilePlayer = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const { isLoading, isFullscreen } = useAtomValue(VideoMetadataAtom);
  const { isNiconicommentsEnable } = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const setWrapperAtom = useSetAtom(WrapperRefAtom);
  const [isAfk, setIsAfk] = useState(false);
  const afkTimeout = useRef(-1);

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

  const toggleAfk = () => {
    setIsAfk(!isAfk);
  };

  useEffect(() => {
    setVideoAtom(videoRef.current);
    setWrapperAtom(wrapperRef.current);
  }, [videoRef, wrapperRef]);

  return (
    <div
      className={`${className} ${Styles.wrapper} ${isAfk && Styles.inactive} ${
        isFullscreen && Styles.fullscreen
      }`}
      onClick={toggleAfk}
      ref={wrapperRef}
    >
      <div className={Styles.videoWrapper}>
        {isLoading && data && (
          <>
            <div className={Styles.loadingWrapper}>
              <LoadingIcon className={Styles.icon} />
            </div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${data.movie.url}`}
              alt={""}
              className={Styles.thumbnail}
            />
          </>
        )}
        {isNiconicommentsEnable && (
          <CommentCanvas
            url={data?.movie.url}
            className={Styles.canvas}
            videoRef={videoRef.current}
            pipVideoRef={null}
          />
        )}
        <Video className={Styles.video} videoRef={videoRef} movie={data} />
      </div>
      <Controller className={Styles.controller} />
      <KeyboardHandler />
      <MediaSessionHandler />
    </div>
  );
};

export { MobilePlayer };
