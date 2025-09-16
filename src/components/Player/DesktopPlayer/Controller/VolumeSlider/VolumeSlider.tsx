import { useAtomValue } from "jotai";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { PlayerVolumeAtom, VideoRefAtom } from "@/atoms/Player";

const VolumeSlider = () => {
  const videoRef = useAtomValue(VideoRefAtom);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const configVolume = useAtomValue(PlayerVolumeAtom);
  const [isDrugging, setIsDrugging] = useState(false);

  const updateVolume = useCallback(
    (clientX: number) => {
      if (!wrapperRef.current || !videoRef) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      else if (x > rect.width) x = rect.width;
      videoRef.volume = x / rect.width;
    },
    [videoRef],
  );

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDrugging) return;
      updateVolume(e.clientX);
    };
    const onMouseUp = () => {
      setIsDrugging(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDrugging, updateVolume]);
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDrugging(true);
    updateVolume(e.clientX);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!videoRef) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      const newVolume = Math.max(0, videoRef.volume - 0.05);
      videoRef.volume = newVolume;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const newVolume = Math.min(1, videoRef.volume + 0.05);
      videoRef.volume = newVolume;
    }
  };

  return (
    <div
      className="relative w-10 h-10 mx-1.5 cursor-pointer"
      onMouseDown={onMouseDown}
      onKeyDown={handleKeyDown}
      ref={wrapperRef}
      role="slider"
      tabIndex={0}
      aria-label="Volume slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(configVolume * 100)}
    >
      <div className="absolute top-5 -translate-y-1/2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-1 rounded-full bg-white"
          style={{
            width: `${configVolume * 100}%`,
          }}
        />
      </div>
      <div
        className="absolute top-5 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
        style={{
          left: `${configVolume * 100}%`,
        }}
      />
    </div>
  );
};

export { VolumeSlider };
