import {
  ChatBubble,
  Hls,
  KeyboardArrowRight,
  OpenInFull,
  SlowMotionVideo,
} from "@mui/icons-material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  PlayerConfigAtom,
  PlayerSettingAtom,
  VideoMetadataAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { Switch } from "@/components/Switch/Switch";
import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/pages/pages.module.scss";
import { ForwardedRef, forwardRef } from "react";

type props = {
  className?: string;
};

const Main_ = ({ className }: props, ref: ForwardedRef<HTMLDivElement>) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);

  const toggleWindowFullscreen = () => {
    setPlayerConfig({
      ...playerConfig,
      windowFullscreen: !playerConfig.windowFullscreen,
    });
    if (metadata.isFullscreen) {
      if (playerConfig.windowFullscreen) {
        wrapperRef
          ?.requestFullscreen()
          .catch(() => setMetadata({ ...metadata, isFullscreen: false }));
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
    setPlayerConfig({
      ...playerConfig,
      isHls: !playerConfig.isHls,
    });
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

const Main = forwardRef(Main_);

export { Main };
