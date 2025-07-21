import { useAtom, useAtomValue } from "jotai";
import type { KeyboardEvent } from "react";
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

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPlayerConfig((pv) => ({ ...pv, isTheatre: !pv.isTheatre }));
    }
  };
  if (isFullscreen) return null;
  return (
    <button
      className={className}
      onClick={toggleTheatre}
      onKeyDown={handleKeyDown}
      type="button"
      tabIndex={0}
      aria-label={
        playerConfig.isTheatre ? "シアターモードを終了" : "シアターモードにする"
      }
    >
      {playerConfig.isTheatre ? <MdCrop169 /> : <MdCrop32 />}
    </button>
  );
};

export { TheatreButton };
