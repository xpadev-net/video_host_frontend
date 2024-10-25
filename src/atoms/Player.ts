import {atom} from "jotai";
import {MovieItem} from "@/@types/api";
import {Options} from "@xpadev-net/niconicomments";
import {PlayerConfig, PlayerState, SettingKey, VideoMetadata} from "@/@types/Player";
import {atomWithStorage} from "jotai/utils";

const MovieItemAtom = atom<MovieItem|undefined>(undefined);
const WrapperRefAtom = atom<HTMLDivElement|null>(null);
const VideoRefAtom = atom<HTMLVideoElement|null>(null);
const VideoMetadataAtom = atom<VideoMetadata>({currentTime:0,duration:0});

const PlayerStateAtom = atom<PlayerState>({paused:false,isLoading:true,isSetting: false,isFullscreen:false});
const PlayerConfigAtom = atomWithStorage<PlayerConfig>("playerConfig",{playbackRate: 1,windowFullscreen:true,autoPlay:true,isTheatre:false,isHls:true,isPipEnable:false,volume:1,isNiconicommentsEnable:true});
const NiconicommentsConfigAtom = atomWithStorage<Options>("niconicommentsConfig",{format: "v1",enableLegacyPiP: true});

const PlayerSettingAtom = atom<SettingKey[]>(["main"]);

export {MovieItemAtom,WrapperRefAtom, VideoRefAtom,VideoMetadataAtom,PlayerConfigAtom,NiconicommentsConfigAtom,PlayerSettingAtom,PlayerStateAtom};