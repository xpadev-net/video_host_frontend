import {
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { useAtomValue } from "jotai";

import { PlayerConfigAtom } from "@/atoms/Player";

const VolumeIcon = () => {
  const { volume } = useAtomValue(PlayerConfigAtom);
  if (volume > 0.5) {
    return <VolumeUp />;
  }
  if (volume > 0.1) {
    return <VolumeDown />;
  }
  if (volume > 0) {
    return <VolumeMute />;
  }
  return <VolumeOff />;
};

export { VolumeIcon };
