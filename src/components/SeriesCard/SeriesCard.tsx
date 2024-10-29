import { FC } from "react";

import { FilteredSeries } from "@/@types/v4Api";
import { Thumbnail } from "@/components/Thumbnail";
import { User } from "@/components/User/User";

import styles from "./SeriesCard.module.scss";

type SeriesCardProps = {
  series: FilteredSeries;
};

export const SeriesCard: FC<SeriesCardProps> = ({ series }) => {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <Thumbnail movie={series.movies?.[0]} />
      </div>
      <div className={styles.titles}>
        <span className={styles.title}>{series.title}</span>
        <User user={series.author} size={"2"} />
      </div>
    </div>
  );
};
