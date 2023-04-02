import { Check, KeyboardArrowLeft } from "@mui/icons-material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  PlayerConfigAtom,
  PlayerSettingAtom,
  VideoRefAtom,
} from "@/atoms/Player";
import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/pages/pages.module.scss";
import { ForwardedRef, forwardRef } from "react";

type props = {
  className?: string;
};

const suggestedRate = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];

const PlaybackRate_ = (
  { className }: props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const videoRef = useAtomValue(VideoRefAtom);

  const backToMain = () => {
    setPlayerSetting((prev) => prev.filter((page) => page !== "playbackRate"));
  };

  const setPlaybackRate = (rate: number) => {
    setPlayerConfig({ ...playerConfig, playbackRate: rate });
    if (videoRef) videoRef.playbackRate = rate;
    backToMain();
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <div className={Styles.item} onClick={backToMain}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowLeft className={Styles.icon} />
          </div>
          <span className={Styles.text}>再生速度</span>
        </div>
      </div>
      {suggestedRate.map((value) => {
        return (
          <div
            className={Styles.item}
            key={value}
            onClick={() => setPlaybackRate(value)}
          >
            <div className={Styles.left}>
              <div className={Styles.iconWrapper}>
                {playerConfig.playbackRate === value && (
                  <Check className={Styles.icon} />
                )}
              </div>
              <span className={Styles.text}>{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PlaybackRate = forwardRef(PlaybackRate_);

export { PlaybackRate };
