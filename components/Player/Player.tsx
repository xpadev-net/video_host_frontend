import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { MovieItem } from "@/@types/api";
import { MovieItemAtom } from "@/atoms/Player";
import { DesktopPlayer } from "@/components/Player/DesktopPlayer";
import { MobilePlayer } from "@/components/Player/MobilePlayer";
import { useIsMobile } from "@/libraries/isMobile";

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
