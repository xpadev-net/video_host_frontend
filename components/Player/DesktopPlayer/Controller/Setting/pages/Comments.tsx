import {
  ChatBubble,
  Filter9,
  KeyboardArrowLeft,
  PictureInPictureAlt,
  SelectAll,
  SixtyFpsSelect,
} from "@mui/icons-material";
import { Options } from "@xpadev-net/niconicomments";
import { useAtom, useSetAtom } from "jotai";
import { ForwardedRef, forwardRef } from "react";

import {
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  PlayerSettingAtom,
} from "@/atoms/Player";
import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/pages/pages.module.scss";
import { Switch } from "@/components/Switch/Switch";

type props = {
  className?: string;
};

const Comments_ = ({ className }: props, ref: ForwardedRef<HTMLDivElement>) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [niconicommentsConfig, setNiconicommentsConfig] = useAtom(
    NiconicommentsConfigAtom
  );
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);

  const backToMain = () => {
    setPlayerSetting((prev) => prev.filter((page) => page !== "comments"));
  };

  const toggleCommentActive = () => {
    setPlayerConfig((prev) => ({
      ...prev,
      isNiconicommentsEnable: !prev.isNiconicommentsEnable,
    }));
  };

  const toggleNiconicommentsConfig = (key: keyof Options) => {
    setNiconicommentsConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const togglePipEnable = () => {
    setPlayerConfig((prev) => ({
      ...prev,
      isPipEnable: !prev.isPipEnable,
    }));
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      <div className={`${Styles.item} ${Styles.header}`} onClick={backToMain}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <KeyboardArrowLeft className={Styles.icon} />
          </div>
          <span className={Styles.text}>コメント</span>
        </div>
      </div>
      <div className={Styles.item} onClick={toggleCommentActive}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <ChatBubble className={Styles.icon} />
          </div>
          <span className={Styles.text}>コメント</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isNiconicommentsEnable} />
          </div>
        </div>
      </div>
      <div
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showFPS")}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SixtyFpsSelect className={Styles.icon} />
          </div>
          <span className={Styles.text}>FPS表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showFPS} />
          </div>
        </div>
      </div>
      <div
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showCollision")}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SelectAll className={Styles.icon} />
          </div>
          <span className={Styles.text}>当たり判定表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showCollision} />
          </div>
        </div>
      </div>
      <div
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showCommentCount")}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <Filter9 className={Styles.icon} />
          </div>
          <span className={Styles.text}>コメント数表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showCommentCount} />
          </div>
        </div>
      </div>
      <div className={Styles.item} onClick={togglePipEnable}>
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <PictureInPictureAlt className={Styles.icon} />
          </div>
          <span className={Styles.text}>PiP</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isPipEnable} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Comments = forwardRef(Comments_);

export { Comments };
