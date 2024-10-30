import { useAtom, useSetAtom } from "jotai";
import { MouseEvent } from "react";
import { MdSettings } from "react-icons/md";

import { PlayerSettingAtom, PlayerStateAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const SettingButton = ({ className }: props) => {
  const [metadata, setMetadata] = useAtom(PlayerStateAtom);
  const setPlayerSetting = useSetAtom(PlayerSettingAtom);
  const toggleTheatre = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMetadata((pv) => ({ ...pv, isSetting: !pv.isSetting }));
    if (!metadata.isSetting) {
      setPlayerSetting(["main"]);
    }
  };
  return (
    <div className={className} onClick={toggleTheatre}>
      <MdSettings />
    </div>
  );
};

export { SettingButton };
