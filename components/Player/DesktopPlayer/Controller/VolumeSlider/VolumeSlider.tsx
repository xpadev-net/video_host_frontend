import { useAtomValue } from "jotai";
import { PlayerConfigAtom, VideoRefAtom } from "@/atoms/Player";
import styled from "styled-components";
import Styles from "@/components/Player/DesktopPlayer/Controller/VolumeSlider/VolumeSlider.module.scss";
import { MouseEvent, useEffect, useRef, useState } from "react";

type GrubberProps = {
  left: number;
};

const VolumeGrubber = styled.div.attrs<GrubberProps>((p) => ({
  style: {
    left: `${p.left * 100}%`,
  },
}))<GrubberProps>``;

const VolumeSlider = () => {
  const videoRef = useAtomValue(VideoRefAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerConfig = useAtomValue(PlayerConfigAtom);
  const [isDrugging, setIsDrugging] = useState(false);

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
  }, [isDrugging]);
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDrugging(true);
    updateVolume(e.clientX);
  };

  const updateVolume = (clientX: number) => {
    if (!wrapperRef.current || !videoRef) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    else if (x > rect.width) x = rect.width;
    videoRef.volume = x / rect.width;
  };

  return (
    <div className={Styles.wrapper} onMouseDown={onMouseDown} ref={wrapperRef}>
      <VolumeGrubber left={playerConfig.volume} className={Styles.grubber} />
    </div>
  );
};

export { VolumeSlider };
