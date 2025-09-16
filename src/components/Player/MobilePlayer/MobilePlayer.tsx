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
import { Controller } from "@/components/Player/MobilePlayer/Controller";
import { CommentCanvas } from "@/components/Player/Shared/CommentCanvas";
import { KeyboardHandler } from "@/components/Player/Shared/KeyboardHandler";
import { MediaSessionHandler } from "@/components/Player/Shared/MediaSessionHandler";
import { PlayerStatusDisplay } from "@/components/Player/Shared/PlayerStatusDisplay";
import { Video } from "@/components/Player/Shared/Video";
import { EnableComments } from "@/contexts/env";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
  data: FilteredMovie;
};

const MobilePlayer = ({ className, data }: props) => {
  const { isLoading, isFullscreen } = useAtomValue(PlayerStateAtom);
  const { isNiconicommentsEnable } = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const setVideoAtom = useSetAtom(VideoRefAtom);
  const setWrapperAtom = useSetAtom(WrapperRefAtom);
  const [isAfk, setIsAfk] = useState(false);
  const afkTimeout = useRef<number>(-1);

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
  }, [setVideoAtom, setWrapperAtom]);

  return (
    <button
      className={cn(
        className,
        "relative h-auto w-full overflow-hidden bg-black",
        isFullscreen && "fixed left-0 top-0 w-screen h-dvh z-[20000]",
      )}
      onClick={toggleAfk}
      ref={wrapperRef}
      type="button"
    >
      <div
        className={cn(
          "aspect-video h-full mx-auto relative max-h-[calc(100dvh-104px)]",
          isFullscreen && "max-w-screen max-h-dvh",
        )}
      >
        {isLoading && data && (
          <>
            <div className="absolute inset-0 w-full h-full bg-black/50 z-10">
              <LoadingIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {data.thumbnailUrl && (
              <Image
                src={data.thumbnailUrl}
                width={360}
                height={240}
                alt={""}
                className="absolute inset-0 w-full h-full z-0"
              />
            )}
          </>
        )}
        {isNiconicommentsEnable && EnableComments && (
          <CommentCanvas
            key={data?.id}
            url={data?.id}
            className={cn(
              "absolute inset-0 w-full h-full z-[2] pointer-events-none object-contain",
              isFullscreen && "max-w-screen max-h-dvh",
            )}
            videoRef={videoRef.current}
            pipVideoRef={null}
          />
        )}
        <Video
          className={cn(
            "absolute inset-0 w-full h-full z-[1]",
            isFullscreen && "max-w-screen max-h-dvh",
          )}
          videoRef={videoRef}
          movie={data}
        />
        <PlayerStatusDisplay />
      </div>
      <Controller
        className={cn(
          "z-10 transition-opacity duration-300",
          isAfk
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto",
        )}
        data={data}
      />
      <KeyboardHandler data={data} />
      <MediaSessionHandler data={data} />
    </button>
  );
};

export { MobilePlayer };
