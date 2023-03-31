import Styles from "@/components/Player/DesktopPlayer/Controller/Controller.module.scss";
import { useAtomValue } from "jotai";
import { MovieItemAtom, VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { MouseEvent, useState } from "react";
import { VolumeIcon } from "@/components/Player/DesktopPlayer/Controller/VolumeIcon";
import { VolumeSlider } from "@/components/Player/DesktopPlayer/Controller/VolumeSlider/VolumeSlider";
import { time2str } from "@/libraries/time";
import { FullscreenButton } from "@/components/Player/DesktopPlayer/Controller/FullscreenButton";
import { TheatreButton } from "@/components/Player/DesktopPlayer/Controller/TheatreButton";
import { PrevNextButton } from "@/components/Player/DesktopPlayer/Controller/PrevNextButton";
import { PlayPauseButton } from "@/components/Player/DesktopPlayer/Controller/PlayPauseButton";
import { Slider } from "@/components/Player/DesktopPlayer/Controller/Slider/Slider";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const { currentTime, duration } = useAtomValue(VideoMetadataAtom);
  const [isVolumeExtend, setIsVolumeExtend] = useState(false);
  const [mutedVolume, setMutedVolume] = useState<number | undefined>(undefined);
  if (!data) return <></>;
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
      setMutedVolume(undefined);
      videoRef.volume = mutedVolume;
    } else if (mutedVolume === 0 && videoRef.volume === 0) {
      setMutedVolume(undefined);
      videoRef.volume = 1;
    } else {
      setMutedVolume(videoRef.volume);
      videoRef.volume = 0;
    }
  };

  return (
    <div className={`${className} ${Styles.wrapper}`} onClick={stopPropagation}>
      <div className={Styles.background}></div>
      <div className={Styles.buttons} onMouseLeave={onMouseLeave}>
        <div className={Styles.leftSideWrapper}>
          <PrevNextButton className={Styles.button} type={"prev"} />
          <PlayPauseButton className={Styles.button} />
          <PrevNextButton className={Styles.button} type={"next"} />
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
          <div className={Styles.timeDisplay}>
            <span className={Styles.text}>{time2str(currentTime)}</span>
            <span className={Styles.text}>/</span>
            <span className={Styles.text}>{time2str(duration)}</span>
          </div>
        </div>
        <div className={Styles.rightSideWrapper}>
          <TheatreButton className={Styles.button} />
          <FullscreenButton className={Styles.button} />
        </div>
      </div>
      <Slider className={Styles.Slider} />
    </div>
  );
};

export { Controller };
