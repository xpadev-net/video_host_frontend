import { useAtom, useAtomValue } from "jotai";

import { PlayerConfigAtom, PlayerStateAtom } from "@/atoms/Player";
import { Crop32, Crop169 } from "@/components/icons";

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
      {playerConfig.isTheatre ? <Crop169 /> : <Crop32 />}
    </div>
  );
};

export { TheatreButton };
