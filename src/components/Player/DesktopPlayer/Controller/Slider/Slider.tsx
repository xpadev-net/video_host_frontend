import { useAtomValue } from "jotai";
import { type MouseEvent, useEffect, useRef, useState } from "react";

import { VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { time2str } from "@/libraries/time";

type props = {
  className?: string;
};

type RangeItemProps = {
  left: number;
  width: number;
};

const Slider = ({ className }: props) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const metadata = useAtomValue(VideoMetadataAtom);
  const [buffered, setBuffered] = useState<RangeItemProps[]>([]);
  const [isDrugging, setIsDrugging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeDisplayPos, setTimeDisplayPos] = useState(0);

  useEffect(() => {
    if (!videoRef) return;
    const onProgress = () => {
      const buffer_arr: RangeItemProps[] = [];
      for (let i = 0; i < videoRef.buffered.length; i++) {
        buffer_arr.push({
          left: (videoRef.buffered.start(i) / videoRef.duration) * 100,
          width:
            ((videoRef.buffered.end(i) - videoRef.buffered.start(i)) /
              videoRef.duration) *
            100,
        });
      }
      setBuffered(buffer_arr);
    };
    const onTimeUpdate = () => {
      if (isDrugging) return;
      setProgress(
        videoRef ? (videoRef.currentTime / videoRef.duration) * 100 : 0,
      );
    };
    videoRef.addEventListener("progress", onProgress);
    videoRef.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      videoRef.removeEventListener("progress", onProgress);
      videoRef.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [videoRef, isDrugging]);
  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDrugging || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      setProgress(((e.clientX - rect.left) / rect.width) * 100);
      return ((e.clientX - rect.left) / rect.width) * 100;
    };
    const onMouseUp = (e: globalThis.MouseEvent) => {
      const progress = onMouseMove(e);
      setIsDrugging(false);
      if (!videoRef || progress === undefined) return;
      videoRef.currentTime = (videoRef.duration * progress) / 100;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDrugging, videoRef]);

  const onMouseDown = () => {
    setIsDrugging(true);
  };

  const onMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setTimeDisplayPos(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <button
      className={`relative w-full h-4 cursor-pointer group ${className || ""}`}
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      type="button"
    >
      <div className="absolute w-full h-[3px] bg-white/20 bottom-0 rounded-full" />
      {buffered.map((item) => {
        return (
          <div
            className="absolute h-[3px] bg-white/80 bottom-0 transition-all duration-250 ease-in-out rounded-full"
            key={item.left}
            {...item}
            style={{
              left: `${item.left}%`,
              width: `${item.width}%`,
            }}
          />
        );
      })}
      <div
        className="absolute h-[3px] bg-accent bottom-0 rounded-full"
        style={{
          left: `0`,
          width: `calc(${progress}% + 1px)`,
        }}
      />
      <div
        className="absolute w-[3px] h-[3px] rounded-full bg-accent -translate-x-1/2 translate-y-1/2 bottom-[1.5px] transition-[width,height] duration-50 ease-in-out group-hover:w-[11px] group-hover:h-[11px]"
        style={{
          left: `${progress}%`,
        }}
      />
      <div
        className="absolute bottom-4 text-xs text-white -translate-x-1/2 hidden group-hover:block"
        style={{
          left: `max(min(${timeDisplayPos}%, 100% - 15px), 15px)`,
        }}
      >
        {time2str((timeDisplayPos / 100) * metadata.duration)}
      </div>
    </button>
  );
};

export { Slider };
