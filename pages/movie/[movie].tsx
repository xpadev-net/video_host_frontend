import { useRouter } from "next/router";
import useSWR from "swr";
import { MovieResponse } from "@/@types/api";
import { swrRequest } from "@/libraries/request";
import Styles from "@/styles/movie.module.scss";
import { PlayList } from "@/components/PlayList/PlayList";

const MoviePage = () => {
  const router = useRouter();
  const query = router.query.movie;
  const { data: result } = useSWR<MovieResponse>(
    `/movie/${encodeURIComponent(typeof query === "string" ? query : "")}`,
    swrRequest
  );
  if (!result || result.status !== "success") return <></>;
  console.log(result);
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.leftSideWrapper}></div>
      <div className={Styles.rightSideWrapper}>
        <PlayList data={result.data} />
      </div>
    </div>
  );
};

export default MoviePage;
