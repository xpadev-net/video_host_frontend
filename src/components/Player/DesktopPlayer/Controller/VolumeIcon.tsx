import { useAtomValue } from "jotai";
import {
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";

import { PlayerConfigAtom } from "@/atoms/Player";

const VolumeIcon = () => {
  const { volume } = useAtomValue(PlayerConfigAtom);
  if (volume > 0.5) {
    return <MdVolumeUp />;
  }
  if (volume > 0.1) {
    return <MdVolumeDown />;
  }
  if (volume > 0) {
    return <MdVolumeMute />;
  }
  return <MdVolumeOff />;
};

export { VolumeIcon };
