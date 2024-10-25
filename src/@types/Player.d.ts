export type PlayerConfig = {
  playbackRate: number;
  windowFullscreen: boolean;
  autoPlay: boolean;
  isTheatre: boolean;
  isHls: boolean;
  isPipEnable: boolean;
  isNiconicommentsEnable: boolean;
  volume: number;
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
