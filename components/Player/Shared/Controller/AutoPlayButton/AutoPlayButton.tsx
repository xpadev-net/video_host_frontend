import { Pause, PlayArrow } from "@mui/icons-material";
import * as Switch from "@radix-ui/react-switch";
import { useAtom } from "jotai";
import { MouseEvent } from "react";

import { PlayerConfigAtom } from "@/atoms/Player";

import Styles from "./AutoPlayButton.module.scss";

type props = {
  className?: string;
};

const AutoPlayButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);

  const toggleAutPlay = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPlayerConfig({ ...playerConfig, autoPlay: !playerConfig.autoPlay });
  };

  return (
    <div
      className={`${className} ${Styles.wrapper} ${
        playerConfig.autoPlay ? Styles.on : Styles.off
      }`}
      onClick={toggleAutPlay}
    >
      <Switch.Root
        className={Styles.root}
        id="airplane-mode"
        checked={playerConfig.autoPlay}
      >
        <Switch.Thumb className={Styles.thumb}>
          {playerConfig.autoPlay ? (
            <PlayArrow className={Styles.icon} />
          ) : (
            <Pause className={Styles.icon} />
          )}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
};

export { AutoPlayButton };
