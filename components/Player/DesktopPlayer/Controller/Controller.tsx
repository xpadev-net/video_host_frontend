import Styles from "@/components/Player/DesktopPlayer/Controller/Controller.module.scss";
import { useAtomValue } from "jotai";
import { MovieItemAtom, VideoIsPaused, VideoRefAtom } from "@/atoms/Player";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { VolumeIcon } from "@/components/Player/DesktopPlayer/Controller/VolumeIcon";
import { VolumeSlider } from "@/components/Player/DesktopPlayer/Controller/VolumeSlider/VolumeSlider";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const isPaused = useAtomValue(VideoIsPaused);
  const [isVolumeExtend, setIsVolumeExtend] = useState(false);
  const [mutedVolume, setMutedVolume] = useState<number | undefined>(undefined);
  const router = useRouter();
  if (!data) return <></>;

  const onPrevClick = () => {
    void router.push(`/movie/${data.prev?.url}`);
  };
  const onNextClick = () => {
    void router.push(`/movie/${data.next?.url}`);
  };

  const togglePlayerState = () => {
    if (videoRef?.paused) {
      void videoRef?.play();
    } else {
      videoRef?.pause();
    }
  };

  const onMouseLeave = () => {
    setIsVolumeExtend(false);
  };

  const onVolumeMouseOver = () => {
    setIsVolumeExtend(true);
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onVolumeClick = () => {
    if (!videoRef) return;
    if (mutedVolume && videoRef.volume === 0) {
      videoRef.volume = mutedVolume;
      setMutedVolume(undefined);
    } else {
      setMutedVolume(videoRef.volume);
      videoRef.volume = 0;
    }
  };

  return (
    <div
      className={`${className} ${Styles.wrapper}`}
      onMouseLeave={onMouseLeave}
      onClick={stopPropagation}
    >
      <div className={Styles.buttons}>
        {data.prev && (
          <button onClick={onPrevClick} className={Styles.button}>
            <SkipPrevious />
          </button>
        )}
        <button onClick={togglePlayerState} className={Styles.button}>
          {isPaused ? <PlayArrow /> : <Pause />}
        </button>
        {data.next && (
          <button onClick={onNextClick} className={Styles.button}>
            <SkipNext />
          </button>
        )}
        <button
          onClick={onVolumeClick}
          onMouseOver={onVolumeMouseOver}
          className={Styles.button}
        >
          <VolumeIcon />
        </button>
        <div
          className={`${Styles.volumeSlider} ${
            isVolumeExtend && Styles.extend
          }`}
        >
          <VolumeSlider />
        </div>
      </div>
      <div className={Styles.Slider}></div>
    </div>
  );
};

export { Controller };
