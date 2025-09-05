import * as Switch from "@radix-ui/react-switch";
import { useAtom } from "jotai";
import type { MouseEvent } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

import { PlayerConfigAtom } from "@/atoms/Player";

import Styles from "./AutoPlayButton.module.scss";

type props = {
  className?: string;
};

const AutoPlayButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);

  const toggleAutoPlay = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPlayerConfig((pv) => ({ ...pv, autoPlay: !pv.autoPlay }));
  };

  return (
    <button
      className={`${className} ${Styles.wrapper} ${
        playerConfig.autoPlay ? Styles.on : Styles.off
      }`}
      onClick={toggleAutoPlay}
      type="button"
    >
      <Switch.Root className={Styles.root} checked={playerConfig.autoPlay}>
        <Switch.Thumb className={Styles.thumb}>
          {playerConfig.autoPlay ? (
            <MdPlayArrow className={Styles.icon} />
          ) : (
            <MdPause className={Styles.icon} />
          )}
        </Switch.Thumb>
      </Switch.Root>
    </button>
  );
};

export { AutoPlayButton };
