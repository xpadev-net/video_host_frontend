import { useAtomValue } from "jotai";
import { MouseEvent } from "react";

import { PlayerStateAtom, VideoRefAtom } from "@/atoms/Player";
import { Pause, PlayArrow } from "@/components/icons";

type props = {
  className?: string;
};

const PlayPauseButton = ({ className }: props) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const { paused } = useAtomValue(PlayerStateAtom);
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
