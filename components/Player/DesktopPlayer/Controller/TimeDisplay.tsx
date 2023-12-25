import { useAtomValue } from "jotai";

import { VideoMetadataAtom } from "@/atoms/Player";
import Styles from "@/components/Player/DesktopPlayer/Controller/Controller.module.scss";
import { time2str } from "@/libraries/time";

const TimeDisplay = () => {
  const metadata = useAtomValue(VideoMetadataAtom);
  return (
    <div className={Styles.timeDisplay}>
      <span className={Styles.text}>{time2str(metadata.currentTime)}</span>
      <span className={Styles.text}>/</span>
      <span className={Styles.text}>{time2str(metadata.duration)}</span>
    </div>
  );
};

export { TimeDisplay };
