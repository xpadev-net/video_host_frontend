import { Crop32Sharp, Crop169Sharp } from "@mui/icons-material";
import { useAtom, useAtomValue } from "jotai";

import { PlayerConfigAtom, PlayerStateAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const TheatreButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const { isFullscreen } = useAtomValue(PlayerStateAtom);
  const toggleTheatre = () => {
    setPlayerConfig((pv) => ({ ...pv, isTheatre: !pv.isTheatre }));
  };
  if (isFullscreen) return <></>;
  return (
    <div className={className} onClick={toggleTheatre}>
      {playerConfig.isTheatre ? <Crop169Sharp /> : <Crop32Sharp />}
    </div>
  );
};

export { TheatreButton };
