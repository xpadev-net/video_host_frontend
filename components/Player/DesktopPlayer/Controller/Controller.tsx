import Styles from "@/components/Player/DesktopPlayer/Controller/Controller.module.scss";
import { useAtomValue } from "jotai";
import { MovieItemAtom, VideoIsPaused } from "@/atoms/Player";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const isPaused = useAtomValue(VideoIsPaused);
  if (!data) return <></>;
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={Styles.buttons}>
        {data.prev && (
          <button>
            <SkipPrevious />
          </button>
        )}
        <button>{isPaused ? <PlayArrow /> : <Pause />}</button>
        {data.next && (
          <button>
            <SkipNext />
          </button>
        )}
      </div>
      <div className={Styles.Slider}></div>
    </div>
  );
};

export { Controller };
