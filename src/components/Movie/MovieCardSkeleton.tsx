import { Skeleton } from "@radix-ui/themes";
import { forwardRef } from "react";
import { UserSkeleton } from "../User/UserSkeleton";
import Styles from "./Movie.module.scss";

type Props = {
  type?: "row" | "column" | "minColumn";
  showSeries?: boolean;
};

export const MovieCardSkeleton = forwardRef<HTMLDivElement, Props>(
  ({ type = "column", showSeries }, ref) => {
    if (type === "column") {
      return (
        <div
          ref={ref}
          className={`${Styles.wrapper} ${Styles[type]} ${Styles.skeletonCard}`}
        >
          <div className={`${Styles.thumbnail} ${Styles.skeleton}`}></div>
          <div className={Styles.titles}>
            <span className={`${Styles.title} ${Styles.skeleton}`}>&nbsp;</span>
            <div className={Styles.list}>
              <UserSkeleton size={"2"} />
              {showSeries && (
                <>
                  <span>&nbsp;・&nbsp;</span>
                  <span className={`${Styles.seriesTitle} ${Styles.skeleton}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${Styles.wrapper} ${Styles[type]} ${Styles.skeletonCard}`}
      >
        {type === "minColumn" && (
          <div className="flex flex-row items-center px-1">
            <Skeleton className={Styles.index} height={"24px"}>
              1
            </Skeleton>
          </div>
        )}
        <div className={`${Styles.thumbnail} ${Styles.skeleton}`}></div>
        <div className={Styles.titles}>
          <span className={`${Styles.title} ${Styles.skeleton}`}>&nbsp;</span>
          <span className={`${Styles.seriesTitle} ${Styles.skeleton}`}>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    );
  },
);
MovieCardSkeleton.displayName = "MovieCardSkeleton";
