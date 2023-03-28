import { useRouter } from "next/router";
import { Error } from "@/components/Error/Error";
import useSWR from "swr";
import { swrRequest } from "@/libraries/request";
import { SeriesResponse } from "@/@types/api";
import { MovieList } from "@/components/MovieList/MovieList";
import Styles from "@/styles/search.module.scss";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.series;
  const { data: result } = useSWR<SeriesResponse>(
    `/series/${encodeURIComponent(typeof query === "string" ? query : "")}`,
    swrRequest
  );
  if (!result) {
    return <></>;
  }
  if (result.status === "fail") {
    void router.push("/login");
    return <></>;
  }
  if (!result.title) {
    return <Error title={"条件に合致するものが見つかりませんでした"} />;
  }
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.moviesWrapper}>
        <h1>{result.title}</h1>
        <div className={Styles.moviesContainer}>
          <MovieList movies={result.movies} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
