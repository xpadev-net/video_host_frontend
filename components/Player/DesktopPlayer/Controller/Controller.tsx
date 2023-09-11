import { useAtom, useAtomValue } from "jotai";
import { MouseEvent, useState } from "react";

import { MovieItemAtom, VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { AutoPlayButton } from "@/components/Player/Shared/Controller/AutoPlayButton";
import { FullscreenButton } from "@/components/Player/Shared/Controller/FullscreenButton";
import { PlayPauseButton } from "@/components/Player/Shared/Controller/PlayPauseButton";
import { PrevNextButton } from "@/components/Player/Shared/Controller/PrevNextButton";
import { SettingButton } from "@/components/Player/Shared/Controller/SettingButton";
import { Setting } from "@/components/Player/Shared/Setting/Setting";
import { time2str } from "@/libraries/time";

import Styles from "./Controller.module.scss";
import { Slider } from "./Slider";
import { TheatreButton } from "./TheatreButton";
import { VolumeIcon } from "./VolumeIcon";
import { VolumeSlider } from "./VolumeSlider";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const data = useAtomValue(MovieItemAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
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
    setMetadata((pv) => ({
      ...pv,
      isSetting: false,
    }));
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
            <span className={Styles.text}>
              {time2str(metadata.currentTime)}
            </span>
            <span className={Styles.text}>/</span>
            <span className={Styles.text}>{time2str(metadata.duration)}</span>
          </div>
        </div>
        <div className={Styles.rightSideWrapper}>
          <AutoPlayButton className={Styles.button} />
          <SettingButton className={Styles.button} />
          <TheatreButton className={Styles.button} />
          <FullscreenButton className={Styles.button} />
        </div>
      </div>
      <Slider className={Styles.Slider} />
      <Setting className={Styles.setting} />
    </div>
  );
};

export { Controller };
