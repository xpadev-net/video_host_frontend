import { useRouter } from "next/router";
import useSWR from "swr";
import { MovieResponse } from "@/@types/api";
import { request } from "@/libraries/request";
import Styles from "@/styles/movie.module.scss";
import { PlayList } from "@/components/PlayList/PlayList";
import { Player } from "@/components/Player/Player";
import { useAtomValue } from "jotai";
import { PlayerConfigAtom } from "@/atoms/Player";
import { MovieInfo } from "@/components/MovieInfo/MovieInfo";
import { useMemo } from "react";

const MoviePage = () => {
  const router = useRouter();
  const query = router.query.movie;
  const { data: result } = useSWR<MovieResponse>(
    `/movie/${encodeURIComponent(typeof query === "string" ? query : "")}`,
    request
  );
  const { isTheatre } = useAtomValue(PlayerConfigAtom);
  const movieInfo = useMemo(() => {
    if (!result || result.status !== "success") return <></>;
    return <MovieInfo className={Styles.info} data={result?.data} />;
  }, [result]);
  if (!result) return <></>;
  if (result.status !== "success") {
    void router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
    return <></>;
  }
  return (
    <div className={`${Styles.wrapper} ${isTheatre && Styles.theatre}`}>
      <div className={Styles.mainWrapper}>
        <div className={Styles.playerWrapper}>
          <Player data={result.data} />
        </div>
        {!isTheatre && movieInfo}
      </div>
      <div className={Styles.subWrapper}>
        {isTheatre && movieInfo}
        <div className={Styles.playlistWrapper}>
          <PlayList data={result.data} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
