import { useAtom, useAtomValue } from "jotai";
import { Maximize, Minimize } from "lucide-react";
import { type KeyboardEvent, type MouseEvent, useEffect } from "react";
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

  const toggleFullscreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMetadata((pv) => ({
      ...pv,
      isSetting: false,
      isFullscreen: !pv.isFullscreen,
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      setMetadata((pv) => ({
        ...pv,
        isSetting: false,
        isFullscreen: !pv.isFullscreen,
      }));
    }
  };

  return (
    <button
      className={className}
      onClick={toggleFullscreen}
      onKeyDown={handleKeyDown}
      type="button"
      tabIndex={0}
      aria-label={
        metadata.isFullscreen ? "フルスクリーンを終了" : "フルスクリーンにする"
      }
    >
      {metadata.isFullscreen ? <Minimize /> : <Maximize />}
    </button>
  );
};

export { FullscreenButton };
