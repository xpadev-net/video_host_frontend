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
import { PlayerSettingAtom, VideoMetadataAtom } from "@/atoms/Player";
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
  const [size, setSize] = useState({ width: 0, height: 0, left: 0 });
  const playerSetting = useAtomValue(PlayerSettingAtom);
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
    if (!targetRef.current) return;
    setSize({
      width: targetRef.current.clientWidth,
      height: targetRef.current.clientHeight,
      left: targetRef.current.offsetLeft,
    });
  }, [targetRef.current, playerSetting]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <SettingWrapper
        _height={size.height}
        _width={size.width}
        className={`${Styles.wrapper} ${className}`}
        onClick={onClick}
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
    </>
  );
};
export { Setting };
