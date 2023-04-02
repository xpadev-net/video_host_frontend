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
      setMetadata({
        ...metadata,
        isFullscreen: document.fullscreenElement !== null,
      });
    };
    document.addEventListener("fullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, [metadata]);
  const toggleFullscreen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const isFullscreen = !metadata.isFullscreen;
    setMetadata({
      ...metadata,
      isSetting: false,
      isFullscreen: isFullscreen,
    });
    if (!wrapperRef) return;
    if (isFullscreen && !playerConfig.windowFullscreen) {
      wrapperRef
        .requestFullscreen()
        .catch(() => setMetadata({ ...metadata, isFullscreen: false }));
    } else {
      document.fullscreenElement && void document.exitFullscreen();
    }
  };

  return (
    <div className={className} onClick={toggleFullscreen}>
      {metadata.isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </div>
  );
};

export { FullscreenButton };
