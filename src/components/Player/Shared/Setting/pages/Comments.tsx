import type { Options } from "@xpadev-net/niconicomments";
import { useAtom, useSetAtom } from "jotai";
import { type FC, type KeyboardEvent, useEffect, useRef } from "react";

import {
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  PlayerSettingAtom,
} from "@/atoms/Player";
import {
  ChatBubble,
  Filter9,
  KeyboardArrowLeft,
  PictureInPictureAlt,
  SelectAll,
  SixtyFpsSelect,
} from "@/components/icons";
import type { MenuProps } from "@/components/Player/Shared/Setting";
import { Switch } from "@/components/Switch/Switch";

import Styles from "./pages.module.scss";

const Comments: FC<MenuProps> = ({ className, updateScale }) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [niconicommentsConfig, setNiconicommentsConfig] = useAtom(
    NiconicommentsConfigAtom,
  );
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    updateScale?.(ref.current);
  }, [updateScale]);

  const backToMain = () => {
    setPlayerSetting((prev) => prev.filter((page) => page !== "comments"));
  };

  const handleBackKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      backToMain();
    }
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

  const handleCommentActiveKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCommentActive();
    }
  };

  const handleNiconicommentsConfigKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    key: keyof Options,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleNiconicommentsConfig(key);
    }
  };

  const handlePipKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePipEnable();
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
          <span className={Styles.text}>コメント</span>
        </div>
      </button>
      <button
        className={Styles.item}
        onClick={toggleCommentActive}
        onKeyDown={handleCommentActiveKeyDown}
        type="button"
        tabIndex={0}
        aria-label={`コメントを${
          playerConfig.isNiconicommentsEnable ? "無効" : "有効"
        }にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <ChatBubble />
          </div>
          <span className={Styles.text}>コメント</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isNiconicommentsEnable} />
          </div>
        </div>
      </button>
      <button
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showFPS")}
        onKeyDown={(e) => handleNiconicommentsConfigKeyDown(e, "showFPS")}
        type="button"
        tabIndex={0}
        aria-label={`FPS表示を${
          niconicommentsConfig.showFPS ? "無効" : "有効"
        }にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SixtyFpsSelect />
          </div>
          <span className={Styles.text}>FPS表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showFPS} />
          </div>
        </div>
      </button>
      <button
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showCollision")}
        onKeyDown={(e) => handleNiconicommentsConfigKeyDown(e, "showCollision")}
        type="button"
        tabIndex={0}
        aria-label={`当たり判定表示を${
          niconicommentsConfig.showCollision ? "無効" : "有効"
        }にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <SelectAll />
          </div>
          <span className={Styles.text}>当たり判定表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showCollision} />
          </div>
        </div>
      </button>
      <button
        className={Styles.item}
        onClick={() => toggleNiconicommentsConfig("showCommentCount")}
        onKeyDown={(e) =>
          handleNiconicommentsConfigKeyDown(e, "showCommentCount")
        }
        type="button"
        tabIndex={0}
        aria-label={`コメント数表示を${
          niconicommentsConfig.showCommentCount ? "無効" : "有効"
        }にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <Filter9 />
          </div>
          <span className={Styles.text}>コメント数表示</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={!!niconicommentsConfig.showCommentCount} />
          </div>
        </div>
      </button>
      <button
        className={Styles.item}
        onClick={togglePipEnable}
        onKeyDown={handlePipKeyDown}
        type="button"
        tabIndex={0}
        aria-label={`PiPを${playerConfig.isPipEnable ? "無効" : "有効"}にする`}
      >
        <div className={Styles.left}>
          <div className={Styles.iconWrapper}>
            <PictureInPictureAlt />
          </div>
          <span className={Styles.text}>PiP</span>
        </div>
        <div className={Styles.right}>
          <div className={Styles.switch}>
            <Switch checked={playerConfig.isPipEnable} />
          </div>
        </div>
      </button>
    </div>
  );
};

export { Comments };
