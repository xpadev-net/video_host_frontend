import { useRouter } from "next/router";
import { Error } from "@/components/Error/Error";
import useSWR from "swr";
import { request } from "@/libraries/request";
import { SeriesResponse } from "@/@types/api";
import { MovieList } from "@/components/MovieList/MovieList";
import Styles from "@/styles/search.module.scss";
import Head from "next/head";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.series;
  const { data: result } = useSWR<SeriesResponse>(
    `/series/${encodeURIComponent(typeof query === "string" ? query : "")}`,
    request
  );
  if (!result) {
    return <></>;
  }
  if (result.status === "fail") {
    void router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
    return <></>;
  }
  if (!result.data.seriesTitle) {
    return (
      <>
        <Head>
          <title>{`検索 - ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        </Head>
        <Error title={"条件に合致するものが見つかりませんでした"} />
      </>
    );
  }
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`${result.data.seriesTitle} - ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <div className={Styles.moviesWrapper}>
        <h1>{result.data.seriesTitle}</h1>
        <div className={Styles.moviesContainer}>
          <MovieList movies={result.data.movies} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
