import { useAtomValue } from "jotai";
import { MouseEvent, useEffect, useRef, useState } from "react";

import { VideoRefAtom } from "@/atoms/Player";
import Styles from "@/components/Player/MobilePlayer/Controller/Slider/Slider.module.scss";

type props = {
  className?: string;
};

type RangeItemProps = {
  left: number;
  width: number;
};

const Slider = ({ className }: props) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [buffered, setBuffered] = useState<RangeItemProps[]>([]);
  const [isDrugging, setIsDrugging] = useState(false);
  const [progress, setProgress] = useState(0);

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
        videoRef ? (videoRef.currentTime / videoRef.duration) * 100 : 0
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
      if (!isDrugging || !wrapperRef.current) return;
      e.preventDefault();
      const rect = wrapperRef.current.getBoundingClientRect();
      const clientX = e.touches.item(0)?.clientX ?? 0;
      setProgress((clientX - rect.left / rect.width) * 100);
      return (clientX - rect.left / rect.width) * 100;
    };
    const onMouseUp = (e: globalThis.MouseEvent) => {
      const progress = onMouseMove(e);
      setIsDrugging(false);
      if (!videoRef || progress === undefined) return;
      videoRef.currentTime = (videoRef.duration * progress) / 100;
    };
    const onTouchEnd = (e: globalThis.TouchEvent) => {
      const progress = onTouchMove(e);
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
  }, [isDrugging]);

  const onMouseDown = () => {
    setIsDrugging(true);
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${Styles.wrapper} ${className}`}
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      onClick={onClick}
    >
      <div className={Styles.background} />
      {buffered.map((item) => {
        return (
          <div
            className={Styles.buffered}
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
        className={Styles.watched}
        style={{
          left: `0`,
          width: `${progress}%`,
        }}
      />
      <div
        className={Styles.grubber}
        style={{
          left: `${progress}%`,
        }}
      />
    </div>
  );
};

export { Slider };
