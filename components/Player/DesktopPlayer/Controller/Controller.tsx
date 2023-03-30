import Styles from "@/components/Player/DesktopPlayer/Controller/Controller.module.scss";
import { useAtomValue } from "jotai";
import { MovieItemAtom, VideoIsPaused, VideoRefAtom } from "@/atoms/Player";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const isPaused = useAtomValue(VideoIsPaused);
  const router = useRouter();
  if (!data) return <></>;

  const onPrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void router.push(`/movie/${data.prev?.url}`);
  };
  const onNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void router.push(`/movie/${data.next?.url}`);
  };

  const togglePlayerState = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef?.paused) {
      void videoRef?.play();
    } else {
      videoRef?.pause();
    }
  };

  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={Styles.buttons}>
        {data.prev && (
          <button onClick={onPrevClick}>
            <SkipPrevious />
          </button>
        )}
        <button onClick={togglePlayerState}>
          {isPaused ? <PlayArrow /> : <Pause />}
        </button>
        {data.next && (
          <button onClick={onNextClick}>
            <SkipNext />
          </button>
        )}
      </div>
      <div className={Styles.Slider}></div>
    </div>
  );
};

export { Controller };
