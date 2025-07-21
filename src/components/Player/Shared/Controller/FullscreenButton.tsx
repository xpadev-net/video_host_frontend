import { useAtom, useAtomValue } from "jotai";
import { type MouseEvent, useEffect } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

import {
  PlayerConfigAtom,
  PlayerStateAtom,
  WrapperRefAtom,
} from "@/atoms/Player";

type props = {
  className?: string;
};

const FullscreenButton = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(PlayerStateAtom);
  const playerConfig = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);

  useEffect(() => {
    const handler = () => {
      if (playerConfig.windowFullscreen) return;
      setMetadata((pv) => ({
        ...pv,
        isFullscreen: document.fullscreenElement !== null,
      }));
    };
    document.addEventListener("fullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, [playerConfig.windowFullscreen, setMetadata]);

  useEffect(() => {
    if (
      metadata.isFullscreen &&
      !playerConfig.windowFullscreen &&
      !document.fullscreenElement &&
      wrapperRef
    ) {
      wrapperRef
        .requestFullscreen()
        .catch(() => setMetadata((pv) => ({ ...pv, isFullscreen: false })));
    } else if (!metadata.isFullscreen && document.fullscreenElement) {
      void document.exitFullscreen();
    }
  }, [
    metadata.isFullscreen,
    playerConfig.windowFullscreen,
    setMetadata,
    wrapperRef,
  ]);

  const toggleFullscreen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMetadata((pv) => ({
      ...pv,
      isSetting: false,
      isFullscreen: !pv.isFullscreen,
    }));
  };

  return (
    <div className={className} onClick={toggleFullscreen}>
      {metadata.isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
    </div>
  );
};

export { FullscreenButton };
