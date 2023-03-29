import {atom} from "jotai";
import {MovieItem} from "@/@types/api";

const MovieItemAtom = atom<MovieItem|undefined>(undefined);
const VideoRefAtom = atom<HTMLVideoElement|null>(null);

export {MovieItemAtom, VideoRefAtom};