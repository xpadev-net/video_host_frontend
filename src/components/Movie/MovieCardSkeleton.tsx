import React, { forwardRef } from "react";

import Styles from "./Movie.module.scss";

export const MovieCardSkeleton = forwardRef<HTMLDivElement>((props, ref) => (
  <div
    ref={ref}
    className={`${Styles.wrapper} ${Styles.row} ${Styles.skeletonCard}`}
  >
    <div className={`${Styles.thumbnail} ${Styles.skeleton}`}></div>
    <div className={Styles.titles}>
      <span className={`${Styles.title} ${Styles.skeleton}`} />
    </div>
  </div>
));
MovieCardSkeleton.displayName = "MovieCardSkeleton";
