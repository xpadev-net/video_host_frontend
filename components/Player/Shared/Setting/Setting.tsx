import { useAtom, useAtomValue } from "jotai";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";

import { SettingKey } from "@/@types/Player";
import {
  PlayerSettingAtom,
  VideoMetadataAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { Comments } from "@/components/Player/Shared/Setting/pages/Comments";
import { Main } from "@/components/Player/Shared/Setting/pages/Main";
import { PlaybackRate } from "@/components/Player/Shared/Setting/pages/PlaybackRate";
import { EnableComments } from "@/contexts/env";
import { useIsMobile } from "@/libraries/isMobile";

import Styles from "./Setting.module.scss";

type Props = {
  className?: string;
};

export type MenuProps = {
  className?: string;
  updateScale?: (ref: HTMLDivElement) => void;
};

const Menu: {
  [key in SettingKey]?: FC<MenuProps>;
} = {
  main: Main,
  playbackRate: PlaybackRate,
  comments: EnableComments ? Comments : undefined,
};

const Setting = ({ className }: Props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    maxHeight: 0,
    left: 0,
  });
  const playerSetting = useAtomValue(PlayerSettingAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const onClick = () => {
      setMetadata((pv) => ({
        ...pv,
        isSetting: false,
      }));
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  const updateScale = (ref: HTMLDivElement) => {
    if (!wrapperRef) return;
    const width = ref.clientWidth,
      height = ref.clientHeight,
      left = ref.offsetLeft;
    setSize((pv) => ({
      ...pv,
      width,
      height,
      left,
      maxHeight: wrapperRef.clientHeight - 120,
    }));
  };

  useEffect(() => {
    if (!wrapperRef) return;
    const handler: ResizeObserverCallback = (entries) => {
      const wrapper = entries[0];
      if (!wrapper) return;
      setSize((pv) => ({
        ...pv,
        maxHeight: wrapper.contentRect.height - 120,
      }));
    };
    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(wrapperRef);
    return () => {
      resizeObserver.disconnect();
    };
  }, [wrapperRef]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`${Styles.scrollContainer} ${className} ${
        !metadata.isSetting && Styles.inactive
      }`}
      style={{
        maxHeight: isMobile ? "unset" : `${size.maxHeight}px`,
      }}
    >
      <div
        onClick={onClick}
        className={Styles.wrapper}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        <div
          className={Styles.container}
          style={{
            left: `-${size.left}px`,
          }}
        >
          {playerSetting.map((key, index) => {
            const Target = Menu[key];
            if (!Target) return;
            if (index + 1 === playerSetting.length) {
              return <Target key={key} updateScale={updateScale} />;
            }
            return <Target key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};
export { Setting };
