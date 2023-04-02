import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/Setting.module.scss";
import styled from "styled-components";
import { Main } from "@/components/Player/DesktopPlayer/Controller/Setting/pages/Main";
import {
  useEffect,
  MouseEvent,
  useRef,
  useState,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  PlayerSettingAtom,
  VideoMetadataAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { PlaybackRate } from "@/components/Player/DesktopPlayer/Controller/Setting/pages/PlaybackRate";
import { SettingKey } from "@/@types/Player";
import { Comments } from "@/components/Player/DesktopPlayer/Controller/Setting/pages/Comments";

type SettingWrapperProps = {
  _width: number;
  _height: number;
};

const SettingWrapper = styled.div.attrs<SettingWrapperProps>((p) => ({
  style: {
    width: `${p._width}px`,
    height: `${p._height}px`,
  },
}))<SettingWrapperProps>``;

type SettingContainerProps = {
  _left: number;
};

const SettingContainer = styled.div.attrs<SettingContainerProps>((p) => ({
  style: {
    left: `-${p._left}px`,
  },
}))<SettingContainerProps>``;

type SettingScrollContainerProps = {
  _height: number;
};

const SettingScrollContainer = styled.div.attrs<SettingScrollContainerProps>(
  (p) => ({
    style: {
      maxHeight: `${p._height}px`,
    },
  })
)<SettingScrollContainerProps>``;

type props = {
  className?: string;
};

const Menu: {
  [key in SettingKey]: ForwardRefExoticComponent<
    props & RefAttributes<HTMLDivElement>
  >;
} = {
  main: Main,
  playbackRate: PlaybackRate,
  comments: Comments,
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
    <SettingScrollContainer
      _height={size.maxHeight}
      ref={scrollContainerRef}
      className={`${Styles.scrollContainer} ${className} ${
        !metadata.isSetting && Styles.inactive
      }`}
    >
      <SettingWrapper
        _height={size.height}
        _width={size.width}
        onClick={onClick}
        className={Styles.wrapper}
      >
        <SettingContainer _left={size.left} className={Styles.container}>
          {playerSetting.map((key, index) => {
            const Target = Menu[key];
            if (index + 1 === playerSetting.length) {
              return <Target key={key} ref={targetRef} />;
            }
            return <Target key={key} />;
          })}
        </SettingContainer>
      </SettingWrapper>
    </SettingScrollContainer>
  );
};
export { Setting };
