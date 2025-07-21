import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FC, useEffect, useRef } from "react";

import {
  PlayerConfigAtom,
  PlayerSettingAtom,
  VideoRefAtom,
} from "@/atoms/Player";
import { Check, KeyboardArrowLeft } from "@/components/icons";
import type { MenuProps } from "@/components/Player/Shared/Setting";

import Styles from "./pages.module.scss";

const suggestedRate = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];

const PlaybackRate: FC<MenuProps> = ({ className, updateScale }) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    updateScale?.(ref.current);
  }, [updateScale]);

  const backToMain = () => {
    setPlayerSetting((prev) => prev.filter((page) => page !== "playbackRate"));
  };

  const setPlaybackRate = (rate: number) => {
    setPlayerConfig((pv) => ({ ...pv, playbackRate: rate }));
    if (videoRef) videoRef.playbackRate = rate;
    backToMain();
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <div className={`${Styles.item} ${Styles.header}`} onClick={backToMain}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowLeft />
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
                {playerConfig.playbackRate === value && <Check />}
              </div>
              <span className={Styles.text}>{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { PlaybackRate };
