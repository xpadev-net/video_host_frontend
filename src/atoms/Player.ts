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
  playbackRate: 1,
  windowFullscreen: true,
  autoPlay: true,
  isTheatre: false,
  isHls: true,
  isPipEnable: false,
  isNiconicommentsEnable: true,
});
const PlayerVolumeAtom = atomWithStorage<number>(
  "playerConfig.playerVolume",
  1,
);

const NiconicommentsConfigAtom = atomWithStorage<Options>(
  "niconicommentsConfig",
  { format: "v1", enableLegacyPiP: true },
);

const PlayerSettingAtom = atom<SettingKey[]>(["main"]);

export {
  NiconicommentsConfigAtom,
  PlayerConfigAtom,
  PlayerVolumeAtom,
  PlayerSettingAtom,
  PlayerStateAtom,
  VideoMetadataAtom,
  VideoRefAtom,
  WrapperRefAtom,
};
