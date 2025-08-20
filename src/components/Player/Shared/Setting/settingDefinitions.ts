import type { Options } from "@xpadev-net/niconicomments";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AppWindow, Gauge, MessageSquareText } from "lucide-react";
import type {
  SelectionItem,
  SettingKey,
  SettingPageConfig,
} from "@/@types/Player";
import {
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  PlayerSettingAtom,
  PlayerStateAtom,
  VideoRefAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import {
  ChatBubble,
  Filter9,
  PictureInPictureAlt,
  SelectAll,
  SixtyFpsSelect,
} from "@/components/icons";
import { EnableComments } from "@/contexts/env";

const suggestedRate = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];

// ヘルパー関数: 型安全なSelectionItemを作成
const createSelectionItem = <T>(
  id: string,
  label: string,
  options: Array<{ value: T; label: string | number }>,
  getValue: () => T,
  onChange: (value: T) => void,
  ariaLabel?: string,
): SelectionItem<T> => ({
  type: "selection",
  id,
  label,
  options,
  getValue,
  onChange,
  ariaLabel,
});

export const useSettingDefinitions = (): Record<
  SettingKey,
  SettingPageConfig
> => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);
  const [state, setState] = useAtom(PlayerStateAtom);
  const [niconicommentsConfig, setNiconicommentsConfig] = useAtom(
    NiconicommentsConfigAtom,
  );
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const videoRef = useAtomValue(VideoRefAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);

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

  const setPlaybackRate = (rate: number) => {
    setPlayerConfig((pv) => ({ ...pv, playbackRate: rate }));
    if (videoRef) videoRef.playbackRate = rate;
    setPlayerSetting((prev) => prev.filter((page) => page !== "playbackRate"));
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

  const mainConfig: SettingPageConfig = [
    {
      type: "navigation",
      id: "playbackRate",
      label: "再生速度",
      icon: Gauge,
      targetPage: "playbackRate",
      getValue: () => playerConfig.playbackRate,
    },
    ...(EnableComments
      ? [
          {
            type: "navigation" as const,
            id: "comments",
            label: "コメント",
            icon: MessageSquareText,
            targetPage: "comments" as SettingKey,
            getValue: () =>
              playerConfig.isNiconicommentsEnable ? "有効" : "無効",
          },
        ]
      : []),
    {
      type: "toggle",
      id: "windowFullscreen",
      label: "ウィンドウフルスクリーン",
      icon: AppWindow,
      getValue: () => playerConfig.windowFullscreen,
      onChange: toggleWindowFullscreen,
    },
  ];

  const playbackRateConfig: SettingPageConfig = [
    {
      type: "back",
      label: "再生速度",
      targetPage: "playbackRate",
    },
    createSelectionItem(
      "playbackRate",
      "再生速度",
      suggestedRate.map((value) => ({ value, label: value })),
      () => playerConfig.playbackRate,
      setPlaybackRate,
    ),
  ];

  const commentsConfig: SettingPageConfig = [
    {
      type: "back",
      label: "コメント",
      targetPage: "comments",
    },
    {
      type: "toggle",
      id: "isNiconicommentsEnable",
      label: "コメント",
      icon: ChatBubble,
      getValue: () => playerConfig.isNiconicommentsEnable,
      onChange: toggleCommentActive,
    },
    {
      type: "toggle",
      id: "showFPS",
      label: "FPS表示",
      icon: SixtyFpsSelect,
      getValue: () => !!niconicommentsConfig.showFPS,
      onChange: () => toggleNiconicommentsConfig("showFPS"),
    },
    {
      type: "toggle",
      id: "showCollision",
      label: "当たり判定表示",
      icon: SelectAll,
      getValue: () => !!niconicommentsConfig.showCollision,
      onChange: () => toggleNiconicommentsConfig("showCollision"),
    },
    {
      type: "toggle",
      id: "showCommentCount",
      label: "コメント数表示",
      icon: Filter9,
      getValue: () => !!niconicommentsConfig.showCommentCount,
      onChange: () => toggleNiconicommentsConfig("showCommentCount"),
    },
    {
      type: "toggle",
      id: "isPipEnable",
      label: "PiP",
      icon: PictureInPictureAlt,
      getValue: () => playerConfig.isPipEnable,
      onChange: togglePipEnable,
    },
  ];

  return {
    main: mainConfig,
    playbackRate: playbackRateConfig,
    comments: commentsConfig,
  };
};
