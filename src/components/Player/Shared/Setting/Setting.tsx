import { useAtom, useAtomValue } from "jotai";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  PlayerSettingAtom,
  PlayerStateAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { GenericPage } from "@/components/Player/Shared/Setting/pages/GenericPage";
import { useSettingDefinitions } from "@/components/Player/Shared/Setting/settingDefinitions";
import { useIsMobile } from "@/libraries/isMobile";

import Styles from "./Setting.module.scss";

type Props = {
  className?: string;
};

export type MenuProps = {
  className?: string;
  updateScale?: (ref: HTMLDivElement) => void;
};

const Setting = ({ className }: Props) => {
  const [state, setState] = useAtom(PlayerStateAtom);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    maxHeight: 0,
    left: 0,
  });
  const playerSetting = useAtomValue(PlayerSettingAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const settingDefinitions = useSettingDefinitions();
  useEffect(() => {
    const onClick = () => {
      setState((pv) => ({
        ...pv,
        isSetting: false,
      }));
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [setState]);

  const updateScale = useMemo<(ref: HTMLDivElement) => void>(() => {
    return (ref: HTMLDivElement) => {
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
  }, [wrapperRef]);

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

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`${Styles.scrollContainer} ${className} ${
        !state.isSetting && Styles.inactive
      }`}
      style={{
        maxHeight: isMobile ? "unset" : `${size.maxHeight}px`,
      }}
    >
      <button
        onClick={onClick}
        className={Styles.wrapper}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
        type="button"
      >
        <div
          className={Styles.container}
          style={{
            left: `-${size.left}px`,
          }}
        >
          {playerSetting.map((key, index) => {
            const config = settingDefinitions[key];
            if (!config) return null;
            if (index + 1 === playerSetting.length) {
              return (
                <GenericPage
                  key={key}
                  config={config}
                  updateScale={updateScale}
                />
              );
            }
            return <GenericPage key={key} config={config} />;
          })}
        </div>
      </button>
    </div>
  );
};
export { Setting };
