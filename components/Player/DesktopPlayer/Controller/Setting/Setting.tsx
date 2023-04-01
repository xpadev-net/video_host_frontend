import Styles from "@/components/Player/DesktopPlayer/Controller/Setting/Setting.module.scss";
import styled from "styled-components";
import { Main } from "@/components/Player/DesktopPlayer/Controller/Setting/pages/Main";

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
  return (
    <SettingWrapper
      _height={140}
      _width={300}
      className={`${Styles.wrapper} ${className}`}
    >
      <Main />
    </SettingWrapper>
  );
};
export { Setting };
