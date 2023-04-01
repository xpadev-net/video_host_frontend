import { Settings } from "@mui/icons-material";
import { useAtom } from "jotai";
import { VideoMetadataAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const SettingButton = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const toggleTheatre = () => {
    setMetadata({ ...metadata, isSetting: !metadata.isSetting });
  };
  return (
    <div className={className} onClick={toggleTheatre}>
      <Settings />
    </div>
  );
};

export { SettingButton };
