import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

import { v4GetMoviesRes, v4GetSeriesListRes } from "@/@types/v4Api";
import { MovieList } from "@/components/MovieList";
import { SeriesCard } from "@/components/SeriesCard";
import { SiteName } from "@/contexts/env";
import { useSearch } from "@/hooks/useSearch";
import Styles from "@/styles/search.module.scss";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.query;
  const movies = useSearch({ query: query as string, page: 1 });
  if (movies.isLoading || !movies.data || movies.data.movies.status !== "ok") {
    return <></>;
  }
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`検索: ${query} - ${SiteName}`}</title>
      </Head>
      <SeriesResult series={movies.data.series} />
      <MovieResult movies={movies.data.movies} />
    </div>
  );
};

type SeriesResultProps = {
  series: v4GetSeriesListRes;
};

const SeriesResult: FC<SeriesResultProps> = ({ series }) => {
  if (series.status !== "ok") {
    return (
      <div className={Styles.seriesWrapper}>
        <h1>シリーズ</h1>
        <h2>読み込みに失敗しました</h2>
        <span>
          {series.code} - {series.message}
        </span>
      </div>
    );
  }
  if (series.data.length === 0) {
    return (
      <div className={Styles.seriesWrapper}>
        <h1>シリーズ</h1>
        <h2>検索結果がありません</h2>
      </div>
    );
  }
  return (
    <div className={Styles.seriesWrapper}>
      <h1>シリーズ</h1>
      <div className={Styles.seriesContainer}>
        {series.data.map((series) => (
          <SeriesCard series={series} key={series.id} />
        ))}
      </div>
    </div>
  );
};

type MovieResultProps = {
  movies: v4GetMoviesRes;
};

const MovieResult: FC<MovieResultProps> = ({ movies }) => {
  if (movies.status !== "ok") {
    return (
      <div className={Styles.moviesWrapper}>
        <h1>動画</h1>
        <h2>読み込みに失敗しました</h2>
        <span>
          {movies.code} - {movies.message}
        </span>
      </div>
    );
  }
  if (movies.data.length === 0) {
    return (
      <div className={Styles.moviesWrapper}>
        <h1>動画</h1>
        <h2>検索結果がありません</h2>
      </div>
    );
  }
  return (
    <div className={Styles.moviesWrapper}>
      <h1>動画</h1>
      <div className={Styles.moviesContainer}>
        <MovieList movies={movies.data} type={"column"} showSeries={true} />
      </div>
    </div>
  );
};

export default SearchPage;
