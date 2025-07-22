import type { FC } from "react";

import { SeriesCard } from "@/components/SeriesCard";
import { useSeriesList } from "@/hooks/useSeriesList";

import styles from "./SearchList.module.scss";

type Props = {
  query?: string;
  author?: string;
};

export const SeriesSearchList: FC<Props> = ({ query, author }) => {
  const { data: series, isLoading } = useSeriesList({ query, author, page: 1 });

  if (isLoading || !series) {
    return null;
  }

  if (series.status !== "ok") {
    return (
      <div className={styles.wrapper}>
        <h2>読み込みに失敗しました</h2>
        <span>
          {series.code} - {series.message}
        </span>
      </div>
    );
  }

  if (series.data.items.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2>検索結果がありません</h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {series.data.items.map((series) => (
          <SeriesCard series={series} key={series.id} />
        ))}
      </div>
    </div>
  );
};
