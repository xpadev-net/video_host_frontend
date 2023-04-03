import { DesktopPlayer } from "@/components/Player/DesktopPlayer/DesktopPlayer";
import { MovieItem } from "@/@types/api";
import { MovieItemAtom } from "@/atoms/Player";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useIsMobile } from "@/libraries/isMobile";
import { MobilePlayer } from "@/components/Player/MobilePlayer/MobilePlayer";

type props = {
  data: MovieItem;
  className?: string;
};

const Player = ({ data, className }: props) => {
  const setMovieItem = useSetAtom(MovieItemAtom);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMovieItem(data);
  }, [data]);

  if (isMobile) return <MobilePlayer className={className} />;
  return <DesktopPlayer className={className} />;
};

export { Player };
