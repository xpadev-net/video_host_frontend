import { DesktopPlayer } from "@/components/Player/DesktopPlayer/DesktopPlayer";
import { MovieItem } from "@/@types/api";
import { MovieItemAtom } from "@/atoms/Player";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

type props = {
  data: MovieItem;
};

const Player = ({ data }: props) => {
  const setMovieItem = useSetAtom(MovieItemAtom);

  useEffect(() => {
    setMovieItem(data);
  }, [data]);

  return (
    <div>
      <DesktopPlayer />
    </div>
  );
};

export { Player };
