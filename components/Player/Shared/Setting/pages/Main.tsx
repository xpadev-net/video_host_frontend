import {
  ChatBubble,
  Hls,
  KeyboardArrowRight,
  OpenInFull,
  SlowMotionVideo,
} from "@mui/icons-material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, useEffect, useRef } from "react";

import {
  PlayerConfigAtom,
  PlayerSettingAtom,
  PlayerStateAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { MenuProps } from "@/components/Player/Shared/Setting";
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

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <div className={Styles.item} onClick={openPlaybackRate}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SlowMotionVideo className={Styles.icon} />
          </div>
          <span className={Styles.text}>再生速度</span>
        </div>
        <div className={Styles.right}>
          <span>{playerConfig.playbackRate}</span>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowRight className={Styles.icon} />
          </div>
        </div>
      </div>
      {EnableComments && (
        <div className={Styles.item} onClick={openComments}>
          <div className={Styles.left}>
            <div className={Styles.iconWrapper}>
              <ChatBubble className={Styles.icon} />
            </div>
            <span className={Styles.text}>コメント</span>
          </div>
          <div className={Styles.right}>
            <span>{playerConfig.isNiconicommentsEnable ? "有効" : "無効"}</span>
            <div className={Styles.iconWrapper}>
              <KeyboardArrowRight className={Styles.icon} />
            </div>
          </div>
        </div>
      )}
      <div className={Styles.item} onClick={toggleWindowFullscreen}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <OpenInFull className={Styles.icon} />
          </div>
          <span className={Styles.text}>ウィンドウフルスクリーン</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.windowFullscreen} />
          </div>
        </div>
      </div>
      <div className={Styles.item} onClick={toggleHls}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <Hls className={Styles.icon} />
          </div>
          <span className={Styles.text}>HLS有効化</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isHls} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Main };
