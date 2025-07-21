import { useAtom, useSetAtom } from "jotai";
import type { KeyboardEvent, MouseEvent } from "react";
import { MdSettings } from "react-icons/md";

import { PlayerSettingAtom, PlayerStateAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const SettingButton = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(PlayerStateAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const toggleTheatre = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMetadata((pv) => ({ ...pv, isSetting: !pv.isSetting }));
    if (!metadata.isSetting) {
      setPlayerSetting(["main"]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      setMetadata((pv) => ({ ...pv, isSetting: !pv.isSetting }));
      if (!metadata.isSetting) {
        setPlayerSetting(["main"]);
      }
    }
  };
  return (
    <button
      className={className}
      onClick={toggleTheatre}
      onKeyDown={handleKeyDown}
      type="button"
      tabIndex={0}
      aria-label={`設定メニューを${metadata.isSetting ? "閉じる" : "開く"}`}
    >
      <MdSettings />
    </button>
  );
};

export { SettingButton };
