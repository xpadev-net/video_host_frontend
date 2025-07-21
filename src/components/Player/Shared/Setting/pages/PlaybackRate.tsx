import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FC, type KeyboardEvent, useEffect, useRef } from "react";

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

  const handleBackKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      backToMain();
    }
  };

  const setPlaybackRate = (rate: number) => {
    setPlayerConfig((pv) => ({ ...pv, playbackRate: rate }));
    if (videoRef) videoRef.playbackRate = rate;
    backToMain();
  };

  const handleRateKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    rate: number,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPlaybackRate(rate);
    }
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <button
        className={`${Styles.item} ${Styles.header}`}
        onClick={backToMain}
        onKeyDown={handleBackKeyDown}
        type="button"
        tabIndex={0}
        aria-label="戻る"
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowLeft />
          </div>
          <span className={Styles.text}>再生速度</span>
        </div>
      </button>
      {suggestedRate.map((value) => {
        return (
          <button
            className={Styles.item}
            key={value}
            onClick={() => setPlaybackRate(value)}
            onKeyDown={(e) => handleRateKeyDown(e, value)}
            type="button"
            tabIndex={0}
            aria-label={`再生速度を${value}倍に設定`}
          >
            <div className={Styles.left}>
              <div className={Styles.iconWrapper}>
                {playerConfig.playbackRate === value && <Check />}
              </div>
              <span className={Styles.text}>{value}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export { PlaybackRate };
