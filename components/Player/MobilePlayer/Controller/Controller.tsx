import { useAtomValue } from "jotai";

import { VideoMetadataAtom } from "@/atoms/Player";
import { AutoPlayButton } from "@/components/Player/DesktopPlayer/Controller/AutoPlayButton";
import { FullscreenButton } from "@/components/Player/DesktopPlayer/Controller/FullscreenButton";
import { PlayPauseButton } from "@/components/Player/DesktopPlayer/Controller/PlayPauseButton";
import { PrevNextButton } from "@/components/Player/DesktopPlayer/Controller/PrevNextButton";
import { Setting } from "@/components/Player/DesktopPlayer/Controller/Setting";
import { SettingButton } from "@/components/Player/DesktopPlayer/Controller/SettingButton";
import Styles from "@/components/Player/MobilePlayer/Controller/Controller.module.scss";
import { Slider } from "@/components/Player/MobilePlayer/Controller/Slider";
import { time2str } from "@/libraries/time";

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
      <Setting className={Styles.setting} />
      {metadata.isSetting && <div className={Styles.settingBackground} />}
    </div>
  );
};

export { Controller };
