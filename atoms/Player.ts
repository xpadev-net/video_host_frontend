import {atom} from "jotai";
import {MovieItem} from "@/@types/api";
import {Options} from "@xpadev-net/niconicomments";

const MovieItemAtom = atom<MovieItem|undefined>(undefined);
const VideoRefAtom = atom<HTMLVideoElement|null>(null);

const NiconicommentsConfigAtom = atom<Options>({format: "v1"});

export {MovieItemAtom, VideoRefAtom,NiconicommentsConfigAtom};