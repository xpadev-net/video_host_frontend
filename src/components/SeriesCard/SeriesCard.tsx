import Link from "next/link";
import type { FC } from "react";

import type { FilteredSeries } from "@/@types/v4Api";
import { Thumbnail } from "@/components/Thumbnail";
import { User } from "@/components/User/User";

import styles from "./SeriesCard.module.scss";

type SeriesCardProps = {
  series: FilteredSeries;
};

export const SeriesCard: FC<SeriesCardProps> = ({ series }) => {
  return (
    <Link className={styles.card} href={`/series/${series.id}`}>
      <div className={styles.thumbnail}>
        <Thumbnail movie={series.movies?.[0]} hideMetadata={true} />
      </div>
      <div className={styles.titles}>
        <span className={styles.title}>{series.title}</span>
        <User user={series.author} size={"2"} />
      </div>
    </Link>
  );
};
