import { forwardRef } from "react";
import { UserSkeleton } from "../User/UserSkeleton";
import Styles from "./Movie.module.scss";

type Props = {
  grid?: boolean;
};

export const MovieCardSkeleton = forwardRef<HTMLDivElement, Props>(
  ({ grid }, ref) => (
    <div
      ref={ref}
      className={`${Styles.wrapper} ${grid ? Styles.row : Styles.column} ${
        Styles.skeletonCard
      }`}
    >
      <div className={`${Styles.thumbnail} ${Styles.skeleton}`}></div>
      <div className={Styles.titles}>
        <span className={`${Styles.title} ${Styles.skeleton}`}>&nbsp;</span>
        <div className={Styles.list}>
          <UserSkeleton size={"2"} />
        </div>
      </div>
    </div>
  ),
);
MovieCardSkeleton.displayName = "MovieCardSkeleton";
