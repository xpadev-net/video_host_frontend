import Styles from "@/components/Player/DesktopPlayer/Controller/Slider/Slider.module.scss";
import { VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState, MouseEvent } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
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
  }, [isDrugging]);

  const onMouseDown = () => {
    setIsDrugging(true);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setTimeDisplayPos(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div
      className={`${Styles.wrapper} ${className}`}
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
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
      <div
        className={Styles.timeDisplay}
        style={{
          left: `max(min(${timeDisplayPos}%, 100% - 15px), 15px)`,
        }}
      >
        {time2str((timeDisplayPos / 100) * metadata.duration)}
      </div>
    </div>
  );
};

export { Slider };
