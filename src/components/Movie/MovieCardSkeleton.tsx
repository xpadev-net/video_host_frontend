import { Skeleton } from "@radix-ui/themes";
import { forwardRef } from "react";
import { UserSkeleton } from "../User/UserSkeleton";

type Props = {
  type?: "row" | "column" | "minColumn";
  showSeries?: boolean;
};

export const MovieCardSkeleton = forwardRef<HTMLDivElement, Props>(
  ({ type = "column", showSeries }, ref) => {
    const getWrapperClasses = () => {
      const baseClasses =
        "text-[var(--color-text)] hover:bg-[var(--color-hover)]";
      const typeClasses = {
        row: "block p-2 rounded-lg max-w-[360px] max-h-[300px] no-underline",
        column: "flex flex-row p-2 rounded-xl",
        minColumn: "flex flex-row h-16 py-1 pr-2 pl-0",
      };
      return `${baseClasses} ${typeClasses[type]}`;
    };

    const getSkeletonClasses = () => {
      return "bg-[#fff1] rounded-lg relative overflow-hidden aspect-video animate-pulse";
    };

    const getTitleSkeletonClasses = () => {
      return "bg-[#fff1] rounded w-full relative overflow-hidden animate-pulse";
    };

    const getSeriesTitleSkeletonClasses = () => {
      return "bg-[#fff1] rounded w-2/5 relative overflow-hidden animate-pulse";
    };

    if (type === "column") {
      return (
        <div ref={ref} className={getWrapperClasses()}>
          <div
            className={`max-w-[40%] w-[357px] ${getSkeletonClasses()}`}
          ></div>
          <div className="flex-1 pl-2.5 flex flex-col gap-2">
            <span
              className={`text-xl overflow-hidden text-ellipsis block text-[var(--color-text)] max-h-[60px] leading-normal ${getTitleSkeletonClasses()}`}
            >
              &nbsp;
            </span>
            <div className="flex flex-row items-center gap-2">
              <UserSkeleton size={"2"} />
              {showSeries && (
                <>
                  <span>&nbsp;・&nbsp;</span>
                  <span
                    className={`overflow-hidden text-ellipsis text-[var(--color-sub-text)] flex flex-row ${getSeriesTitleSkeletonClasses()}`}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    const getThumbnailClasses = () => {
      if (type === "row") {
        return `mb-[7px] ${getSkeletonClasses()}`;
      }
      if (type === "minColumn") {
        return `w-[100px] h-14 ${getSkeletonClasses()}`;
      }
      return getSkeletonClasses();
    };

    const getTitlesClasses = () => {
      if (type === "row") {
        return "min-h-10";
      }
      if (type === "minColumn") {
        return "py-0.5 px-0 pl-[5px] flex-1";
      }
      return "";
    };

    const getTitleClasses = () => {
      const baseSkeletonClass = getTitleSkeletonClasses();
      if (type === "row") {
        return `text-[17px] leading-5 font-bold max-h-10 text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-normal block tracking-[0] ${baseSkeletonClass}`;
      }
      if (type === "minColumn") {
        return `my-0 mb-1 text-sm leading-4 max-h-8 text-ellipsis overflow-hidden block text-[var(--color-text)] tracking-[0] whitespace-normal ${baseSkeletonClass}`;
      }
      return `text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-normal block tracking-[0] ${baseSkeletonClass}`;
    };

    const getSeriesTitleClasses = () => {
      const baseSkeletonClass = getSeriesTitleSkeletonClasses();
      if (type === "row") {
        return `h-[18px] leading-[18px] text-[13px] text-ellipsis overflow-hidden text-[var(--color-sub-text)] tracking-[0] flex flex-row ${baseSkeletonClass}`;
      }
      if (type === "minColumn") {
        return `leading-[18px] font-normal text-[13px] max-h-[18px] text-ellipsis overflow-hidden text-[var(--color-sub-text)] tracking-[0] flex flex-row ${baseSkeletonClass}`;
      }
      return `overflow-hidden text-ellipsis tracking-[0] text-[var(--color-sub-text)] flex flex-row ${baseSkeletonClass}`;
    };

    return (
      <div ref={ref} className={getWrapperClasses()}>
        {type === "minColumn" && (
          <div className="flex flex-row items-center px-1">
            <Skeleton
              className="w-6 leading-[56px] text-xs text-center"
              height={"24px"}
            >
              1
            </Skeleton>
          </div>
        )}
        <div className={getThumbnailClasses()}></div>
        <div className={getTitlesClasses()}>
          <span className={getTitleClasses()}>&nbsp;</span>
          <span className={getSeriesTitleClasses()}>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    );
  },
);
MovieCardSkeleton.displayName = "MovieCardSkeleton";
