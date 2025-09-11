import { useAtomValue, useSetAtom } from "jotai";
import { type MouseEvent, useState } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { VideoMetadataAtom, VideoRefAtom } from "@/atoms/Player";
import { TimeDisplay } from "@/components/Player/DesktopPlayer/Controller/TimeDisplay";
import { AutoPlayButton } from "@/components/Player/Shared/Controller/AutoPlayButton";
import { FullscreenButton } from "@/components/Player/Shared/Controller/FullscreenButton";
import { PlayPauseButton } from "@/components/Player/Shared/Controller/PlayPauseButton";
import { PrevNextButton } from "@/components/Player/Shared/Controller/PrevNextButton";
import { SettingButton } from "@/components/Player/Shared/Controller/SettingButton";
import { Setting } from "@/components/Player/Shared/Setting/Setting";

import { Slider } from "./Slider";
import { TheatreButton } from "./TheatreButton";
import { VolumeIcon } from "./VolumeIcon";
import { VolumeSlider } from "./VolumeSlider";

type props = {
  data: FilteredMovie;
  className?: string;
};

const Controller = ({ className, data }: props) => {
  const videoRef = useAtomValue(VideoRefAtom);
  const setMetadata = useSetAtom(VideoMetadataAtom);
  const [isVolumeExtend, setIsVolumeExtend] = useState(false);
  const [mutedVolume, setMutedVolume] = useState<number | undefined>(undefined);
  if (!data) return null;
  const onMouseLeave = () => {
    setIsVolumeExtend(false);
  };

  const onVolumeMouseOver = () => {
    setIsVolumeExtend(true);
  };

  const stopPropagation = (e: MouseEvent<HTMLButtonElement>) => {
    setMetadata((pv) => ({
      ...pv,
      isSetting: false,
    }));
    e.stopPropagation();
  };

  const onVolumeClick = () => {
    if (!videoRef) return;
    if (mutedVolume && videoRef.volume === 0) {
      setMutedVolume(undefined);
      videoRef.volume = mutedVolume;
      videoRef.muted = false;
    } else if (mutedVolume === 0 && videoRef.volume === 0) {
      setMutedVolume(undefined);
      videoRef.volume = 1;
      videoRef.muted = false;
    } else {
      setMutedVolume(videoRef.volume);
      videoRef.volume = 0;
    }
  };

  return (
    <button
      className={`${className} relative px-3 flex flex-col-reverse select-none text-white`}
      onClick={stopPropagation}
      aria-label="Video player controls"
      type="button"
    >
      <div
        className="absolute left-0 h-[100px] w-full -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
      <button
        className="flex flex-row h-10 justify-between"
        onMouseLeave={onMouseLeave}
        aria-label="Video controls"
        type="button"
      >
        <div className="flex flex-row items-center">
          <PrevNextButton
            className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6"
            type={"prev"}
            data={data}
          />
          <PlayPauseButton className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6" />
          <PrevNextButton
            className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6"
            type={"next"}
            data={data}
          />
          <button
            type="button"
            onClick={onVolumeClick}
            onMouseOver={onVolumeMouseOver}
            onFocus={onVolumeMouseOver}
            className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6"
          >
            <VolumeIcon />
          </button>
          <div
            className={`overflow-hidden transition-[width] duration-[250ms] ease mr-2.5 ${
              isVolumeExtend ? "w-[52px]" : "w-0"
            }`}
          >
            <VolumeSlider />
          </div>
          <TimeDisplay />
        </div>
        <div className="flex flex-row items-center">
          <AutoPlayButton className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6" />
          <SettingButton className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6" />
          <TheatreButton className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6" />
          <FullscreenButton className="w-10 h-10 border-none bg-none cursor-pointer flex justify-center items-center [&>svg]:w-6 [&>svg]:h-6" />
        </div>
      </button>
      <Slider />
      <Setting className="absolute right-3 bottom-[60px]" />
    </button>
  );
};

export { Controller };
