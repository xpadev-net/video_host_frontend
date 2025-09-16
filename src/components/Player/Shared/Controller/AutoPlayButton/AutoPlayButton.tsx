import * as Switch from "@radix-ui/react-switch";
import { useAtom } from "jotai";
import type { MouseEvent } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

import { PlayerConfigAtom } from "@/atoms/Player";

type props = {
  className?: string;
};

const AutoPlayButton = ({ className }: props) => {
  const [playerConfig, setPlayerConfig] = useAtom(PlayerConfigAtom);

  const toggleAutoPlay = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPlayerConfig((pv) => ({ ...pv, autoPlay: !pv.autoPlay }));
  };

  return (
    <button className={className} onClick={toggleAutoPlay} type="button">
      <Switch.Root
        className={`w-[30px] h-[10px] rounded-full bg-white/50 border-none relative cursor-pointer`}
        checked={playerConfig.autoPlay}
      >
        <Switch.Thumb
          className={`w-[17px] h-[17px] absolute rounded-full left-[8px] top-[50%] -translate-y-[50%] -translate-x-[50%] flex items-center justify-center transition-all data-[state=checked]:left-[22px] ${
            playerConfig.autoPlay ? "bg-white" : "bg-gray-600"
          }`}
        >
          {playerConfig.autoPlay ? (
            <MdPlayArrow className={"w-[13px] h-[13px] text-black"} />
          ) : (
            <MdPause className={"w-[13px] h-[13px] text-white"} />
          )}
        </Switch.Thumb>
      </Switch.Root>
    </button>
  );
};

export { AutoPlayButton };
