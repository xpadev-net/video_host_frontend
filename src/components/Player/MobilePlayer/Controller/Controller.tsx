import { useAtomValue } from "jotai";

import type { FilteredMovie } from "@/@types/v4Api";
import { PlayerStateAtom } from "@/atoms/Player";
import { TimeDisplay } from "@/components/Player/MobilePlayer/Controller/TimeDisplay";
import { AutoPlayButton } from "@/components/Player/Shared/Controller/AutoPlayButton";
import { FullscreenButton } from "@/components/Player/Shared/Controller/FullscreenButton";
import { PlayPauseButton } from "@/components/Player/Shared/Controller/PlayPauseButton";
import { PrevNextButton } from "@/components/Player/Shared/Controller/PrevNextButton";
import { SettingButton } from "@/components/Player/Shared/Controller/SettingButton";
import { Setting } from "@/components/Player/Shared/Setting";
import { cn } from "@/lib/utils";
import { Slider } from "./Slider";

type props = {
  data: FilteredMovie;
  className?: string;
};

const Controller = ({ className, data }: props) => {
  const state = useAtomValue(PlayerStateAtom);
  return (
    <div
      className={cn(
        `absolute left-0 top-0 w-full h-full bg-black/70 flex flex-col justify-between text-white`,
        className,
      )}
    >
      <div className="h-12 flex justify-end mx-2.5">
        <AutoPlayButton className="w-10 h-10 border-none bg-transparent cursor-pointer flex justify-center items-center" />
        <SettingButton className="w-10 h-10 border-none bg-transparent cursor-pointer flex justify-center items-center" />
      </div>
      <div className="h-20 flex justify-center items-center">
        <div className="w-10 h-10">
          <PrevNextButton
            type={"prev"}
            className="w-10 h-10 border-none bg-transparent cursor-pointer flex justify-center items-center [&>svg]:w-10 [&>svg]:h-10"
            data={data}
          />
        </div>
        <PlayPauseButton className="w-20 h-20 border-none bg-transparent cursor-pointer flex justify-center items-center mx-10 [&>svg]:w-20 [&>svg]:h-20" />
        <div className="w-10 h-10">
          <PrevNextButton
            type={"next"}
            className="w-10 h-10 border-none bg-transparent cursor-pointer flex justify-center items-center [&>svg]:w-10 [&>svg]:h-10"
            data={data}
          />
        </div>
      </div>
      <div className="h-10 mx-2.5 flex">
        <TimeDisplay />
        <Slider className="h-10 flex-1 mx-2.5" />
        <FullscreenButton className="w-10 h-10 border-none bg-transparent cursor-pointer flex justify-center items-center" />
      </div>
      <Setting className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[30001]" />
      {state.isSetting && (
        <div className="bg-black/50 fixed top-0 left-0 w-screen h-screen z-[30000]" />
      )}
    </div>
  );
};

export { Controller };
