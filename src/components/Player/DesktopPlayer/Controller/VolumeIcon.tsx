import { useAtomValue } from "jotai";
import {
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";

import { PlayerVolumeAtom } from "@/atoms/Player";

const VolumeIcon = () => {
  const volume = useAtomValue(PlayerVolumeAtom);
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
