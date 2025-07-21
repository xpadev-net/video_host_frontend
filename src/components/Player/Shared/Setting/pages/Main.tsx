import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FC, type KeyboardEvent, useEffect, useRef } from "react";

import {
  PlayerConfigAtom,
  PlayerSettingAtom,
  PlayerStateAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import {
  ChatBubble,
  Hls,
  KeyboardArrowRight,
  OpenInFull,
  SlowMotionVideo,
} from "@/components/icons";
import type { MenuProps } from "@/components/Player/Shared/Setting";
import { Switch } from "@/components/Switch/Switch";
import { EnableComments } from "@/contexts/env";

import Styles from "./pages.module.scss";

const Main: FC<MenuProps> = ({ className, updateScale }) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [state, setState] = useAtom(PlayerStateAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    updateScale?.(ref.current);
  }, [updateScale]);

  const toggleWindowFullscreen = () => {
    setPlayerConfig((pv) => ({
      ...pv,
      windowFullscreen: !pv.windowFullscreen,
    }));
    if (state.isFullscreen) {
      if (playerConfig.windowFullscreen) {
        wrapperRef
          ?.requestFullscreen()
          .catch(() => setState((pv) => ({ ...pv, isFullscreen: false })));
      } else {
        document.fullscreenElement && void document.exitFullscreen();
      }
    }
  };

  const openPlaybackRate = () => {
    setPlayerSetting((prev) => [...prev, "playbackRate"]);
  };

  const openComments = () => {
    setPlayerSetting((prev) => [...prev, "comments"]);
  };
  const toggleHls = () => {
    setPlayerConfig((pv) => ({
      ...pv,
      isHls: !pv.isHls,
    }));
  };

  const handlePlaybackRateKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPlaybackRate();
    }
  };

  const handleCommentsKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openComments();
    }
  };

  const handleWindowFullscreenKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleWindowFullscreen();
    }
  };

  const handleHlsKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleHls();
    }
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <button
        className={Styles.item}
        onClick={openPlaybackRate}
        onKeyDown={handlePlaybackRateKeyDown}
        type="button"
        tabIndex={0}
        aria-label="再生速度設定を開く"
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SlowMotionVideo />
          </div>
          <span className={Styles.text}>再生速度</span>
        </div>
        <div className={Styles.right}>
          <span>{playerConfig.playbackRate}</span>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowRight />
          </div>
        </div>
      </button>
      {EnableComments && (
        <button
          className={Styles.item}
          onClick={openComments}
          onKeyDown={handleCommentsKeyDown}
          type="button"
          tabIndex={0}
          aria-label="コメント設定を開く"
        >
          <div className={Styles.left}>
            <div className={Styles.iconWrapper}>
              <ChatBubble />
            </div>
            <span className={Styles.text}>コメント</span>
          </div>
          <div className={Styles.right}>
            <span>{playerConfig.isNiconicommentsEnable ? "有効" : "無効"}</span>
            <div className={Styles.iconWrapper}>
              <KeyboardArrowRight />
            </div>
          </div>
        </button>
      )}
      <button
        className={Styles.item}
        onClick={toggleWindowFullscreen}
        onKeyDown={handleWindowFullscreenKeyDown}
        type="button"
        tabIndex={0}
        aria-label={`ウィンドウフルスクリーンを${
          playerConfig.windowFullscreen ? "無効" : "有効"
        }にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <OpenInFull />
          </div>
          <span className={Styles.text}>ウィンドウフルスクリーン</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.windowFullscreen} />
          </div>
        </div>
      </button>
      <button
        className={Styles.item}
        onClick={toggleHls}
        onKeyDown={handleHlsKeyDown}
        type="button"
        tabIndex={0}
        aria-label={`HLSを${playerConfig.isHls ? "無効" : "有効"}にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <Hls />
          </div>
          <span className={Styles.text}>HLS有効化</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isHls} />
          </div>
        </div>
      </button>
    </div>
  );
};

export { Main };
