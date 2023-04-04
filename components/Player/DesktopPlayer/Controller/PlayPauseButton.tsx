import { Pause, PlayArrow } from "@mui/icons-material";
import { useAtomValue } from "jotai";
import { VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { MouseEvent } from "react";

type props = {
  className?: string;
};

const PlayPauseButton = ({ className }: props) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const { paused } = useAtomValue(VideoMetadataAtom);
  const togglePlayerState = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef?.paused) {
      void videoRef?.play();
    } else {
      videoRef?.pause();
    }
  };

  return (
    <button onClick={togglePlayerState} className={className}>
      {paused ? <PlayArrow /> : <Pause />}
    </button>
  );
};

export { PlayPauseButton };
