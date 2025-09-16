import { useAtomValue } from "jotai";

import { VideoMetadataAtom } from "@/atoms/Player";
import { time2str } from "@/libraries/time";

const TimeDisplay = () => {
  const metadata = useAtomValue(VideoMetadataAtom);
  return (
    <div className="text-xs">
      <span className="text-gray-300 mx-0.5">
        {time2str(metadata.currentTime)}
      </span>
      <span className="text-gray-300 mx-0.5">/</span>
      <span className="text-gray-300 mx-0.5">
        {time2str(metadata.duration)}
      </span>
    </div>
  );
};

export { TimeDisplay };
