import { useSetAtom } from "jotai";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { type FC, type KeyboardEvent, useEffect, useRef } from "react";
import type {
  SettingItem,
  SettingKey,
  SettingPageConfig,
} from "@/@types/Player";
import { PlayerSettingAtom } from "@/atoms/Player";
import type { MenuProps } from "@/components/Player/Shared/Setting";
import { Switch } from "@/components/Switch/Switch";

// Tailwind移行: CSS Modulesを廃止

type GenericPageProps = MenuProps & {
  config: SettingPageConfig;
};

const GenericPage: FC<GenericPageProps> = ({
  className,
  updateScale,
  config,
}) => {
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const ref = useRef<HTMLDivElement | null>(null);

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
        item.type === "back"
          ? "flex flex-row h-10 leading-10 cursor-pointer justify-between border-b border-white/20 -mt-[5px] pb-[5px] box-content hover:bg-white/10"
          : "flex flex-row h-10 leading-10 cursor-pointer justify-between hover:bg-white/10",
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
            <div className="flex">
              {item.icon && (
                <div className="w-10 h-10 p-2">
                  <item.icon />
                </div>
              )}
              <span className="">{item.label}</span>
            </div>
            <div className="flex justify-end">
              <span>{currentValue}</span>
              <div className="w-10 h-10 p-2">
                <ArrowRight />
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
            <div className="flex">
              {item.icon && (
                <div className="w-10 h-10 p-2">
                  <item.icon />
                </div>
              )}
              <span className="">{item.label}</span>
            </div>
            <div className="flex justify-end">
              <div className="w-10 h-10 mr-2.5 border-0 bg-transparent cursor-pointer flex justify-center items-center">
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
            className="flex flex-row h-10 leading-10 cursor-pointer justify-between hover:bg-white/10"
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
            <div className="flex">
              <div className="w-10 h-10 p-2">
                {currentValue === option.value && <Check />}
              </div>
              <span className="">{option.label}</span>
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
            <div className="flex">
              <div className="w-10 h-10 p-2">
                <ArrowLeft />
              </div>
              <span className="">{item.label}</span>
            </div>
          </button>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col py-2.5 w-fit min-w-[250px] ${className ?? ""}`}
      ref={ref}
    >
      {config.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export { GenericPage };
