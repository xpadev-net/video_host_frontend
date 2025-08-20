import { useAtomValue, useSetAtom } from "jotai";
import { type MouseEvent, useState } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { TimeDisplay } from "@/components/Player/DesktopPlayer/Controller/TimeDisplay";
import { AutoPlayButton } from "@/components/Player/Shared/Controller/AutoPlayButton";
import { FullscreenButton } from "@/components/Player/Shared/Controller/FullscreenButton";
import { PlayPauseButton } from "@/components/Player/Shared/Controller/PlayPauseButton";
import { PrevNextButton } from "@/components/Player/Shared/Controller/PrevNextButton";
import { SettingButton } from "@/components/Player/Shared/Controller/SettingButton";
import { Setting } from "@/components/Player/Shared/Setting/Setting";

import Styles from "./Controller.module.scss";
import { Slider } from "./Slider";
import { TheatreButton } from "./TheatreButton";
import { VolumeIcon } from "./VolumeIcon";
import { VolumeSlider } from "./VolumeSlider";

type props = {
  data: FilteredMovie;
  className?: string;
};

const Controller = ({ className, data }: props) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const setMetadata = useSetAtom(VideoMetadataAtom);
  const [isVolumeExtend, setIsVolumeExtend] = useState(false);
  const [mutedVolume, setMutedVolume] = useState<number | undefined>(undefined);
  if (!data) return null;
  const onMouseLeave = () => {
    setIsVolumeExtend(false);
  };

  const onVolumeMouseOver = () => {
    setIsVolumeExtend(true);
  };

  const stopPropagation = (e: MouseEvent<HTMLButtonElement>) => {
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
      videoRef.muted = false;
    } else if (mutedVolume === 0 && videoRef.volume === 0) {
      setMutedVolume(undefined);
      videoRef.volume = 1;
      videoRef.muted = false;
    } else {
      setMutedVolume(videoRef.volume);
      videoRef.volume = 0;
    }
  };

  return (
    <button
      className={`${className} ${Styles.wrapper} text-white`}
      onClick={stopPropagation}
      aria-label="Video player controls"
      type="button"
    >
      <div className={Styles.background}></div>
      <button
        className={Styles.buttons}
        onMouseLeave={onMouseLeave}
        aria-label="Video controls"
        type="button"
      >
        <div className={Styles.leftSideWrapper}>
          <PrevNextButton className={Styles.button} type={"prev"} data={data} />
          <PlayPauseButton className={Styles.button} />
          <PrevNextButton className={Styles.button} type={"next"} data={data} />
          <button
            type="button"
            onClick={onVolumeClick}
            onMouseOver={onVolumeMouseOver}
            onFocus={onVolumeMouseOver}
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
          <TimeDisplay />
        </div>
        <div className={Styles.rightSideWrapper}>
          <AutoPlayButton className={Styles.button} />
          <SettingButton className={Styles.button} />
          <TheatreButton className={Styles.button} />
          <FullscreenButton className={Styles.button} />
        </div>
      </button>
      <Slider className={Styles.Slider} />
      <Setting className={Styles.setting} />
    </button>
  );
};

export { Controller };
