import { useRouter } from "next/router";
import { Error } from "@/components/Error/Error";
import useSWR from "swr";
import { request } from "@/libraries/request";
import { SearchResponse } from "@/@types/api";
import Link from "next/link";
import { MovieList } from "@/components/MovieList/MovieList";
import Styles from "@/styles/search.module.scss";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.query;
  const { data: result } = useSWR<SearchResponse>(
    `/search/${encodeURIComponent(typeof query === "string" ? query : "")}`,
    request
  );
  if (!result) {
    return <></>;
  }
  if (result.status === "fail") {
    void router.push("/login");
    return <></>;
  }
  if (result.movies.length < 1 && result.series.length < 1) {
    return <Error title={"条件に合致するものが見つかりませんでした"} />;
  }
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.seriesWrapper}>
        <h1>シリーズ</h1>
        <div className={Styles.seriesContainer}>
          {result.series.map((series) => (
            <Link href={`/series/${series.seriesUrl}`} key={series.seriesUrl}>
              <h2 className={Styles.text}>{series.seriesTitle}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className={Styles.moviesWrapper}>
        <h1>動画</h1>
        <div className={Styles.moviesContainer}>
          <MovieList movies={result.movies} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;