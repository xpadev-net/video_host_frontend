import { Crop169Sharp, Crop32Sharp } from "@mui/icons-material";
import { useAtom } from "jotai";
import { PlayerConfigAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const TheatreButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const toggleTheatre = () => {
    setPlayerConfig({ ...playerConfig, isTheatre: !playerConfig.isTheatre });
  };
  if (playerConfig.isFullscreen) return <></>;
  return (
    <div className={className} onClick={toggleTheatre}>
      {playerConfig.isTheatre ? <Crop169Sharp /> : <Crop32Sharp />}
    </div>
  );
};

export { TheatreButton };
