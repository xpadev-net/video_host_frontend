import { useRouter } from "next/router";
import useSWR from "swr";
import { MovieResponse } from "@/@types/api";
import { request } from "@/libraries/request";
import Styles from "@/styles/movie.module.scss";
import { PlayList } from "@/components/PlayList/PlayList";
import { Player } from "@/components/Player/Player";

const MoviePage = () => {
  const router = useRouter();
  const query = router.query.movie;
  const { data: result } = useSWR<MovieResponse>(
    `/movie/${encodeURIComponent(typeof query === "string" ? query : "")}`,
    request
  );
  if (!result || result.status !== "success") return <></>;
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.leftSideWrapper}>
        <Player data={result.data} />
      </div>
      <div className={Styles.rightSideWrapper}>
        <PlayList data={result.data} />
      </div>
    </div>
  );
};

export default MoviePage;
