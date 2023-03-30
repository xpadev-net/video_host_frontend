import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { useAtom, useAtomValue } from "jotai";
import { PlayerConfigAtom, WrapperRefAtom } from "@/atoms/Player";
import { useEffect } from "react";

type props = {
  className?: string;
};

const FullscreenButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);

  useEffect(() => {
    const handler = () => {
      setPlayerConfig({
        ...playerConfig,
        isFullscreen: document.fullscreenElement !== null,
      });
    };
    if (!!document.fullscreenElement !== playerConfig.isFullscreen) {
      handler();
    }
    document.addEventListener("fullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, [playerConfig]);
  const toggleFullscreen = () => {
    setPlayerConfig({
      ...playerConfig,
      isFullscreen: !playerConfig.isFullscreen,
    });
    if (!wrapperRef) return;
    if (!playerConfig.isFullscreen) {
      wrapperRef
        .requestFullscreen()
        .catch(() => setPlayerConfig({ ...playerConfig, isFullscreen: false }));
    } else {
      document.fullscreenElement && void document.exitFullscreen();
    }
  };

  return (
    <div className={className} onClick={toggleFullscreen}>
      {playerConfig.isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </div>
  );
};

export { FullscreenButton };
