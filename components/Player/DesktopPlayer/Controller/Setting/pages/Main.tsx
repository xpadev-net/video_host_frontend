import {
  ChatBubble,
  KeyboardArrowRight,
  OpenInFull,
  SlowMotionVideo,
} from "@mui/icons-material";
import { useAtom } from "jotai";
import { PlayerConfigAtom } from "@/atoms/Player";
import { Switch } from "@/components/Switch/Switch";
import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/pages/pages.module.scss";

const Main = () => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);

  const toggleWindowFullscreen = () => {
    setPlayerConfig({
      ...playerConfig,
      windowFullscreen: !playerConfig.windowFullscreen,
    });
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.item}>
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
      <div className={Styles.item}>
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
    </div>
  );
};

export { Main };
