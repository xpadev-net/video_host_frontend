import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { FilteredMovie } from "@/@types/v4Api";
import { LoadingIcon } from "@/assets/LoadingIcon";
import {
  PlayerConfigAtom,
  PlayerStateAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { Controller } from "@/components/Player/MobilePlayer/Controller";
import Styles from "@/components/Player/MobilePlayer/MobilePlayer.module.scss";
import { CommentCanvas } from "@/components/Player/Shared/CommentCanvas";
import { KeyboardHandler } from "@/components/Player/Shared/KeyboardHandler";
import { MediaSessionHandler } from "@/components/Player/Shared/MediaSessionHandler";
import { Video } from "@/components/Player/Shared/Video";
import { EnableComments } from "@/contexts/env";

type props = {
  className?: string;
  data: FilteredMovie;
};

const MobilePlayer = ({ className, data }: props) => {
  const { isLoading, isFullscreen } = useAtomValue(PlayerStateAtom);
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
    setIsAfk((pv) => !pv);
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
              src={data.thumbnailUrl ?? ""}
              alt={""}
              className={Styles.thumbnail}
            />
          </>
        )}
        {isNiconicommentsEnable && EnableComments && (
          <CommentCanvas
            key={data?.id}
            url={data?.id}
            className={Styles.canvas}
            videoRef={videoRef.current}
            pipVideoRef={null}
          />
        )}
        <Video className={Styles.video} videoRef={videoRef} movie={data} />
      </div>
      <Controller className={Styles.controller} data={data} />
      <KeyboardHandler data={data} />
      <MediaSessionHandler data={data} />
    </div>
  );
};

export { MobilePlayer };
