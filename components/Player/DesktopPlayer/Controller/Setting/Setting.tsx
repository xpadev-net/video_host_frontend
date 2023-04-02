import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/Setting.module.scss";
import styled from "styled-components";
import { Main } from "@/components/Player/DesktopPlayer/Controller/Setting/pages/Main";
import { useEffect, MouseEvent } from "react";
import { useAtom } from "jotai";
import { VideoMetadataAtom } from "@/atoms/Player";

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

type props = {
  className?: string;
};

const Setting = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(VideoMetadataAtom);

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

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <SettingWrapper
      _height={140}
      _width={300}
      className={`${Styles.wrapper} ${className}`}
      onClick={onClick}
    >
      <Main />
    </SettingWrapper>
  );
};
export { Setting };
