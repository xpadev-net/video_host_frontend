import { useAtom, useAtomValue } from "jotai";
import { MdCrop32, MdCrop169 } from "react-icons/md";

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
      {playerConfig.isTheatre ? <MdCrop169 /> : <MdCrop32 />}
    </div>
  );
};

export { TheatreButton };
