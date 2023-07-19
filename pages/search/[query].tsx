import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import { SearchResponse } from "@/@types/api";
import { Error } from "@/components/Error";
import { MovieList } from "@/components/MovieList";
import { request } from "@/libraries/request";
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
    void router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
    return <></>;
  }
  if (result.data.movies.length < 1 && result.data.series.length < 1) {
    return (
      <>
        <Head>
          <title>{`検索: ${query} - ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        </Head>
        <Error title={"条件に合致するものが見つかりませんでした"} />
      </>
    );
  }
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`検索: ${query} - ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <div className={Styles.seriesWrapper}>
        <h1>シリーズ</h1>
        <div className={Styles.seriesContainer}>
          {result.data.series.map((series) => (
            <Link href={`/series/${series.seriesUrl}`} key={series.seriesUrl}>
              <h2 className={Styles.text}>{series.seriesTitle}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className={Styles.moviesWrapper}>
        <h1>動画</h1>
        <div className={Styles.moviesContainer}>
          <MovieList movies={result.data.movies} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
