import Styles from "@/components/Player/MobilePlayer/Controller/Controller.module.scss";
import { AutoPlayButton } from "@/components/Player/DesktopPlayer/Controller/AutoPlayButton/AutoPlayButton";
import { SettingButton } from "@/components/Player/DesktopPlayer/Controller/SettingButton";
import { PrevNextButton } from "@/components/Player/DesktopPlayer/Controller/PrevNextButton";
import { PlayPauseButton } from "@/components/Player/DesktopPlayer/Controller/PlayPauseButton";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
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
      <div className={Styles.bottom}></div>
    </div>
  );
};

export { Controller };
