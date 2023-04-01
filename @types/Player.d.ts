export type PlayerConfig = {
  playbackRate: number;
  windowFullscreen: boolean;
  autoPlay: boolean;
  isTheatre: boolean;
  isHls: boolean
  isPipEnable: boolean;
  isFullscreen: boolean;
  isNiconicommentsEnable: boolean;
  volume: number;
}

export type VideoMetadata = {
  currentTime: number;
  duration: number;
  paused: boolean;
  isLoading: boolean;
  isSetting:boolean;
}

export type SettingKey = "main"|"playbackRate"|"mode"|"comment";