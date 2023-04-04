import Styles from "@/components/Player/MobilePlayer/Controller/Controller.module.scss";
import { AutoPlayButton } from "@/components/Player/DesktopPlayer/Controller/AutoPlayButton/AutoPlayButton";
import { SettingButton } from "@/components/Player/DesktopPlayer/Controller/SettingButton";
import { PrevNextButton } from "@/components/Player/DesktopPlayer/Controller/PrevNextButton";
import { PlayPauseButton } from "@/components/Player/DesktopPlayer/Controller/PlayPauseButton";
import { time2str } from "@/libraries/time";
import { VideoMetadataAtom } from "@/atoms/Player";
import { Slider } from "@/components/Player/MobilePlayer/Controller/Slider/Slider";
import { FullscreenButton } from "@/components/Player/DesktopPlayer/Controller/FullscreenButton";
import { useAtomValue } from "jotai";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const metadata = useAtomValue(VideoMetadataAtom);
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={Styles.top}>
        <AutoPlayButton className={Styles.button} />
        <SettingButton className={Styles.button} />
      </div>
      <div className={Styles.middle}>
        <div className={Styles.buttonWrapper}>
          <PrevNextButton type={"prev"} className={Styles.button} />
        </div>
        <PlayPauseButton className={Styles.playPauseButton} />
        <div className={Styles.buttonWrapper}>
          <PrevNextButton type={"next"} className={Styles.button} />
        </div>
      </div>
      <div className={Styles.bottom}>
        <div className={Styles.timeDisplay}>
          <span className={Styles.text}>{time2str(metadata.currentTime)}</span>
          <span className={Styles.text}>/</span>
          <span className={Styles.text}>{time2str(metadata.duration)}</span>
        </div>
        <Slider className={Styles.slider} />
        <FullscreenButton className={Styles.button} />
      </div>
    </div>
  );
};

export { Controller };
