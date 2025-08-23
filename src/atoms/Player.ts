import type { Options } from "@xpadev-net/niconicomments";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type {
  PlayerConfig,
  PlayerState,
  SettingKey,
  VideoMetadata,
} from "@/@types/Player";

const WrapperRefAtom = atom<HTMLButtonElement | null>(null);
const VideoRefAtom = atom<HTMLVideoElement | null>(null);
const VideoMetadataAtom = atom<VideoMetadata>({ currentTime: 0, duration: 0 });

const PlayerStateAtom = atom<PlayerState>({
  paused: false,
  isLoading: true,
  isSetting: false,
  isFullscreen: false,
});
const PlayerConfigAtom = atomWithStorage<PlayerConfig>("playerConfig", {
  windowFullscreen: true,
  autoPlay: true,
  isTheatre: false,
  isPipEnable: false,
  isNiconicommentsEnable: true,
});

const PlayerPlaybackRateAtom = atomWithStorage<number>(
  "playerConfig.playerPlaybackRate",
  1,
);

const PlayerVolumeAtom = atomWithStorage<number>(
  "playerConfig.playerVolume",
  1,
);

const NiconicommentsConfigAtom = atomWithStorage<Options>(
  "niconicommentsConfig",
  { format: "v1", enableLegacyPiP: true },
);

const PlayerSettingAtom = atom<SettingKey[]>(["main"]);

const PlayerSeekNotificationAtom = atom<{
  direction: "forward" | "backward";
  seconds: number;
} | null>(null);

const PlayerPlayPauseNotificationAtom = atom<{
  action: "play" | "pause";
} | null>(null);

export {
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  PlayerPlaybackRateAtom,
  PlayerPlayPauseNotificationAtom,
  PlayerVolumeAtom,
  PlayerSettingAtom,
  PlayerStateAtom,
  PlayerSeekNotificationAtom,
  VideoMetadataAtom,
  VideoRefAtom,
  WrapperRefAtom,
};
