import { forwardRef } from "react";

import styles from "./SeriesCard.module.scss";

export const SeriesCardSkeleton = forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} className={`${styles.card} ${styles.skeletonCard}`}>
    <div className={`${styles.thumbnail} ${styles.skeleton}`}></div>
    <div className={styles.titles}>
      <span className={`${styles.title} ${styles.skeleton}`} />
      <div className={`${styles.user} ${styles.skeleton}`} />
    </div>
  </div>
));
SeriesCardSkeleton.displayName = "SeriesCardSkeleton";
