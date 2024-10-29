import { FC } from "react";

import { MovieCard } from "@/components/Movie";
import { useMovies } from "@/hooks/useMovies";

import styles from "./SearchList.module.scss";

type MovieResultProps = {
  query?: string;
  author?: string;
};

export const MoviesSearchList: FC<MovieResultProps> = ({ query, author }) => {
  const { data: movies, isLoading } = useMovies({ query, author, page: 1 });

  if (isLoading || !movies) {
    return <></>;
  }

  if (movies.status !== "ok") {
    return (
      <div className={styles.wrapper}>
        <h2>読み込みに失敗しました</h2>
        <span>
          {movies.code} - {movies.message}
        </span>
      </div>
    );
  }
  if (movies.data.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2>検索結果がありません</h2>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {movies.data.map((movie) => (
          <MovieCard
            movie={movie}
            type={"column"}
            key={movie.id}
            showSeries={true}
          />
        ))}
      </div>
    </div>
  );
};
