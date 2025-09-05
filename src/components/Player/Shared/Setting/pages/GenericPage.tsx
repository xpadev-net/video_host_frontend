import { useSetAtom } from "jotai";
import { type FC, type KeyboardEvent, useEffect, useRef } from "react";
import type {
  SettingItem,
  SettingKey,
  SettingPageConfig,
} from "@/@types/Player";
import { PlayerSettingAtom } from "@/atoms/Player";
import {
  Check,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@/components/icons";
import type { MenuProps } from "@/components/Player/Shared/Setting";
import { Switch } from "@/components/Switch/Switch";

import Styles from "./pages.module.scss";

type GenericPageProps = MenuProps & {
  config: SettingPageConfig;
};

const GenericPage: FC<GenericPageProps> = ({
  className,
  updateScale,
  config,
}) => {
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    updateScale?.(ref.current);
  }, [updateScale]);

  const handleNavigation = (targetPage: string) => {
    setPlayerSetting((prev) => [...prev, targetPage as SettingKey]);
  };

  const handleBack = (targetPage: string) => {
    setPlayerSetting((prev) => prev.filter((page) => page !== targetPage));
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const renderItem = (item: SettingItem, index: number) => {
    const baseProps = {
      className:
        item.type === "back" ? `${Styles.item} ${Styles.header}` : Styles.item,
      type: "button" as const,
      tabIndex: 0,
    };

    switch (item.type) {
      case "navigation": {
        const currentValue = item.getValue();
        return (
          <button
            key={`${item.type}-${index}`}
            {...baseProps}
            onClick={() => handleNavigation(item.targetPage)}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation(item.targetPage))
            }
            aria-label={item.ariaLabel || `${item.label}設定を開く`}
          >
            <div className={Styles.left}>
              {item.icon && (
                <div className={Styles.iconWrapper}>
                  <item.icon />
                </div>
              )}
              <span className={Styles.text}>{item.label}</span>
            </div>
            <div className={Styles.right}>
              <span>{currentValue}</span>
              <div className={Styles.iconWrapper}>
                <KeyboardArrowRight />
              </div>
            </div>
          </button>
        );
      }

      case "toggle": {
        const isChecked = item.getValue();
        return (
          <button
            key={`${item.type}-${index}`}
            {...baseProps}
            onClick={() => item.onChange(!isChecked)}
            onKeyDown={(e) => handleKeyDown(e, () => item.onChange(!isChecked))}
            aria-label={
              item.ariaLabel ||
              `${item.label}を${isChecked ? "無効" : "有効"}にする`
            }
          >
            <div className={Styles.left}>
              {item.icon && (
                <div className={Styles.iconWrapper}>
                  <item.icon />
                </div>
              )}
              <span className={Styles.text}>{item.label}</span>
            </div>
            <div className={Styles.right}>
              <div className={Styles.switch}>
                <Switch checked={isChecked} />
              </div>
            </div>
          </button>
        );
      }

      case "selection": {
        const currentValue = item.getValue();
        return item.options.map((option) => (
          <button
            key={`${item.id}-${option.value}`}
            className={Styles.item}
            onClick={() => item.onChange(option.value)}
            onKeyDown={(e) =>
              handleKeyDown(e, () => item.onChange(option.value))
            }
            type="button"
            tabIndex={0}
            aria-label={
              item.ariaLabel || `${item.label}を${option.label}に設定`
            }
          >
            <div className={Styles.left}>
              <div className={Styles.iconWrapper}>
                {currentValue === option.value && <Check />}
              </div>
              <span className={Styles.text}>{option.label}</span>
            </div>
          </button>
        ));
      }

      case "back": {
        return (
          <button
            key={`${item.type}-${index}`}
            {...baseProps}
            onClick={() => handleBack(item.targetPage)}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleBack(item.targetPage))
            }
            aria-label="戻る"
          >
            <div className={Styles.left}>
              <div className={Styles.iconWrapper}>
                <KeyboardArrowLeft />
              </div>
              <span className={Styles.text}>{item.label}</span>
            </div>
          </button>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={`${Styles.wrapper} ${className}`} ref={ref}>
      {config.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export { GenericPage };
