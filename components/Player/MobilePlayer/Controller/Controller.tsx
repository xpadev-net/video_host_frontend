import { useAtomValue } from "jotai";

import { PlayerStateAtom } from "@/atoms/Player";
import { TimeDisplay } from "@/components/Player/MobilePlayer/Controller/TimeDisplay";
import { AutoPlayButton } from "@/components/Player/Shared/Controller/AutoPlayButton";
import { FullscreenButton } from "@/components/Player/Shared/Controller/FullscreenButton";
import { PlayPauseButton } from "@/components/Player/Shared/Controller/PlayPauseButton";
import { PrevNextButton } from "@/components/Player/Shared/Controller/PrevNextButton";
import { SettingButton } from "@/components/Player/Shared/Controller/SettingButton";
import { Setting } from "@/components/Player/Shared/Setting";

import Styles from "./Controller.module.scss";
import { Slider } from "./Slider";

type props = {
  className?: string;
};

const Controller = ({ className }: props) => {
  const state = useAtomValue(PlayerStateAtom);
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
        <TimeDisplay />
        <Slider className={Styles.slider} />
        <FullscreenButton className={Styles.button} />
      </div>
      <Setting className={Styles.setting} />
      {state.isSetting && <div className={Styles.settingBackground} />}
    </div>
  );
};

export { Controller };
