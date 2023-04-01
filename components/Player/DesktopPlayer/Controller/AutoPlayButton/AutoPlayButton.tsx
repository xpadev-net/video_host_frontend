import { useAtom } from "jotai";
import { PlayerConfigAtom } from "@/atoms/Player";
import * as Switch from "@radix-ui/react-switch";
import Styles from "@/components/Player/DesktopPlayer/Controller/AutoPlayButton/AutoPlayButton.module.scss";
import { Pause, PlayArrow } from "@mui/icons-material";

type props = {
  className?: string;
};

const AutoPlayButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);

  const toggleAutPlay = () => {
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
