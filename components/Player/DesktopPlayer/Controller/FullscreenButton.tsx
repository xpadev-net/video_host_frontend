import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { useAtom, useAtomValue } from "jotai";
import {
  PlayerConfigAtom,
  VideoMetadataAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { MouseEvent, useEffect } from "react";

type props = {
  className?: string;
};

const FullscreenButton = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const playerConfig = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);

  useEffect(() => {
    const handler = () => {
      if (playerConfig.windowFullscreen) return;
      setMetadata({
        ...metadata,
        isFullscreen: document.fullscreenElement !== null,
      });
    };
    document.addEventListener("fullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, [metadata, playerConfig.windowFullscreen]);

  useEffect(() => {
    if (
      metadata.isFullscreen &&
      !playerConfig.windowFullscreen &&
      !document.fullscreenElement &&
      wrapperRef
    ) {
      wrapperRef
        .requestFullscreen()
        .catch(() => setMetadata({ ...metadata, isFullscreen: false }));
    } else if (!metadata.isFullscreen && document.fullscreenElement) {
      void document.exitFullscreen();
    }
  }, [metadata.isFullscreen]);

  const toggleFullscreen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const isFullscreen = !metadata.isFullscreen;
    setMetadata({
      ...metadata,
      isSetting: false,
      isFullscreen: isFullscreen,
    });
  };

  return (
    <div className={className} onClick={toggleFullscreen}>
      {metadata.isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </div>
  );
};

export { FullscreenButton };
