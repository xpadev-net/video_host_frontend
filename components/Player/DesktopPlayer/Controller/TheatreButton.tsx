import { Crop169Sharp, Crop32Sharp } from "@mui/icons-material";
import { useAtom, useAtomValue } from "jotai";
import { PlayerConfigAtom, VideoMetadataAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const TheatreButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const { isFullscreen } = useAtomValue(VideoMetadataAtom);
  const toggleTheatre = () => {
    setPlayerConfig({ ...playerConfig, isTheatre: !playerConfig.isTheatre });
  };
  if (isFullscreen) return <></>;
  return (
    <div className={className} onClick={toggleTheatre}>
      {playerConfig.isTheatre ? <Crop169Sharp /> : <Crop32Sharp />}
    </div>
  );
};

export { TheatreButton };
