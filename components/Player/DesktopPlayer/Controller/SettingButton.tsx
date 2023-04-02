import { Settings } from "@mui/icons-material";
import { useAtom, useSetAtom } from "jotai";
import { PlayerSettingAtom, VideoMetadataAtom } from "@/atoms/Player";
import { MouseEvent } from "react";

type props = {
  className?: string;
};

const SettingButton = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const toggleTheatre = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMetadata({ ...metadata, isSetting: !metadata.isSetting });
    if (!metadata.isSetting) {
      setPlayerSetting(["main"]);
    }
  };
  return (
    <div className={className} onClick={toggleTheatre}>
      <Settings />
    </div>
  );
};

export { SettingButton };
