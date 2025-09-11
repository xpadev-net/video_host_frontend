import { useAtomValue } from "jotai";
import { type MouseEvent, useEffect, useRef, useState } from "react";

import { VideoRefAtom } from "@/atoms/Player";
import { cn } from "@/lib/utils";

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
  const [buffered, setBuffered] = useState<RangeItemProps[]>([]);
  const [isDrugging, setIsDrugging] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastTouchEventRef = useRef<globalThis.TouchEvent | null>(null);

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
    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (!isDrugging || !wrapperRef.current || e.touches.length === 0) return;
      e.preventDefault();
      const rect = wrapperRef.current.getBoundingClientRect();
      const clientX = e.touches.item(0)?.clientX ?? 0;
      lastTouchEventRef.current = e;
      setProgress(((clientX - rect.left) / rect.width) * 100);
      return ((clientX - rect.left) / rect.width) * 100;
    };
    const onMouseUp = (e: globalThis.MouseEvent) => {
      const progress = onMouseMove(e);
      setIsDrugging(false);
      if (!videoRef || progress === undefined) return;
      videoRef.currentTime = (videoRef.duration * progress) / 100;
    };
    const onTouchEnd = () => {
      if (!lastTouchEventRef.current) return;
      const progress = onTouchMove(lastTouchEventRef.current);
      setIsDrugging(false);
      if (!videoRef || progress === undefined) return;
      videoRef.currentTime = (videoRef.duration * progress) / 100;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDrugging, videoRef]);

  const onMouseDown = () => {
    setIsDrugging(true);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <button
      className={cn(`relative w-full cursor-pointer group`, className)}
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      onClick={onClick}
      type="button"
    >
      <div className="absolute w-full h-1 bg-white/20 top-[18px]" />
      {buffered.map((item) => {
        return (
          <div
            className="absolute h-1 bg-white/80 top-[18px] transition-all duration-[250ms] ease-in-out"
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
        className="absolute h-1 bg-accent top-[18px]"
        style={{
          left: `0`,
          width: `${progress}%`,
        }}
      />
      <div
        className="absolute w-0 h-0 rounded-full bg-accent bottom-5 -translate-x-1/2 translate-y-1/2 transition-[width,height] duration-[50ms] ease-in-out group-hover:w-[11px] group-hover:h-[11px]"
        style={{
          left: `${progress}%`,
        }}
      />
    </button>
  );
};

export { Slider };
