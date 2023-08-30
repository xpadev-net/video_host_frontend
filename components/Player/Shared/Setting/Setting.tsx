import { useAtom, useAtomValue } from "jotai";
import {
  ForwardRefExoticComponent,
  MouseEvent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

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

type props = {
  className?: string;
};

const Menu: {
  [key in SettingKey]?: ForwardRefExoticComponent<
    props & RefAttributes<HTMLDivElement>
  >;
} = {
  main: Main,
  playbackRate: PlaybackRate,
  comments: EnableComments ? Comments : undefined,
};

const Setting = ({ className }: props) => {
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
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const onClick = () => {
      setMetadata({
        ...metadata,
        isSetting: false,
      });
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [metadata]);

  useEffect(() => {
    if (!targetRef.current || !wrapperRef || !scrollContainerRef.current)
      return;
    setSize({
      ...size,
      width: targetRef.current.clientWidth,
      height: targetRef.current.clientHeight,
      left: targetRef.current.offsetLeft,
      maxHeight: wrapperRef.clientHeight - 120,
    });
  }, [targetRef.current, wrapperRef, playerSetting]);

  useEffect(() => {
    if (!wrapperRef) return;
    const handler: ResizeObserverCallback = (entries) => {
      const wrapper = entries[0];
      if (!wrapper) return;
      setSize({
        ...size,
        maxHeight: wrapper.contentRect.height - 120,
      });
    };
    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(wrapperRef);
    return () => {
      resizeObserver.disconnect();
    };
  }, [size, wrapperRef]);

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
              return <Target key={key} ref={targetRef} />;
            }
            return <Target key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};
export { Setting };
