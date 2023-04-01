import {atom} from "jotai";
import {MovieItem} from "@/@types/api";
import {Options} from "@xpadev-net/niconicomments";
import {PlayerConfig, SettingKey, VideoMetadata} from "@/@types/Player";
import {atomWithStorage} from "jotai/utils";

const MovieItemAtom = atom<MovieItem|undefined>(undefined);
const WrapperRefAtom = atom<HTMLDivElement|null>(null);
const VideoRefAtom = atom<HTMLVideoElement|null>(null);
const VideoMetadataAtom = atom<VideoMetadata>({currentTime:0,duration:0,paused:false,isLoading:true,isSetting: false});

const PlayerConfigAtom = atomWithStorage<PlayerConfig>("playerConfig",{playbackRate: 1,windowFullscreen:true,autoPlay:true,isTheatre:false,isFullscreen: false,isHls:true,isPipEnable:false,volume:1,isNiconicommentsEnable:true});
const NiconicommentsConfigAtom = atom<Options>({format: "v1"});

const PlayerSettingAtom = atom<SettingKey[]>([]);

export {MovieItemAtom,WrapperRefAtom, VideoRefAtom,VideoMetadataAtom,PlayerConfigAtom,NiconicommentsConfigAtom,PlayerSettingAtom};