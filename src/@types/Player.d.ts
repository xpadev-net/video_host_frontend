import type { ComponentType } from "react";

export type PlayerConfig = {
  windowFullscreen: boolean;
  autoPlay: boolean;
  isTheatre: boolean;
  isPipEnable: boolean;
  isNiconicommentsEnable: boolean;
};

export type VideoMetadata = {
  currentTime: number;
  duration: number;
};

export type PlayerState = {
  paused: boolean;
  isLoading: boolean;
  isSetting: boolean;
  isFullscreen: boolean;
};

export type SettingKey = "main" | "playbackRate" | "comments";

// Setting Items Types
type BaseSettingItem = {
  id: string;
  label: string;
  icon?: ComponentType;
  ariaLabel?: string;
};

export type NavigationItem = BaseSettingItem & {
  type: "navigation";
  targetPage: SettingKey;
  getValue: () => string | number;
};

export type ToggleItem = BaseSettingItem & {
  type: "toggle";
  getValue: () => boolean;
  onChange: (value: boolean) => void;
};

export type SelectionItem<T = unknown> = BaseSettingItem & {
  type: "selection";
  options: Array<{ value: T; label: string | number }>;
  getValue: () => T;
  onChange: (value: T) => void;
};

export type BackItem = {
  type: "back";
  label: string;
  targetPage: SettingKey;
};

export type SettingItem =
  | NavigationItem
  | ToggleItem
  | SelectionItem<T>
  | BackItem;
export type SettingPageConfig = SettingItem[];
