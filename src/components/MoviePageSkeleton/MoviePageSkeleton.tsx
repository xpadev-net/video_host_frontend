import { MovieInfoSkeleton } from "@/components/MovieInfo/MovieInfoSkeleton";
import { PlayerSkeleton } from "@/components/Player/PlayerSkeleton";
import { PlayListSkeleton } from "@/components/PlayList/PlayListSkeleton";
import Styles from "@/styles/movie.module.scss";

const MoviePageSkeleton = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.container}>
        <div className={Styles.playerWrapper}>
          <PlayerSkeleton />
        </div>
        <MovieInfoSkeleton className={Styles.metadata} />
        <div className={Styles.playlistWrapper}>
          <PlayListSkeleton className={Styles.playlist} />
        </div>
      </div>
    </div>
  );
};

export { MoviePageSkeleton };
