import Link from "next/link";
import { type ForwardedRef, forwardRef } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { Thumbnail } from "@/components/Thumbnail";
import { User } from "@/components/User/User";

export type props = {
  movie: FilteredMovie;
  type: "row" | "column" | "minColumn";
  index?: number | "active";
  showSeries?: boolean;
};

const MovieCard_ = (
  { movie, index, type, showSeries }: props,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
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

  if (type === "column") {
    return (
      <div className={getWrapperClasses()}>
        <Link className="max-w-[40%] w-[357px]" href={`/movies/${movie.id}`}>
          <Thumbnail movie={movie} />
        </Link>
        <div className="flex-1 pl-2.5 flex flex-col gap-2">
          <Link href={`/movies/${movie.id}`}>
            <span
              className="text-xl overflow-hidden text-ellipsis block text-[var(--color-text)] max-h-[60px] leading-normal"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {movie.title}
            </span>
          </Link>
          {showSeries && movie.series ? (
            <div className="flex flex-row items-center gap-2">
              <User user={movie.author} size={"2"} />・
              <span className="overflow-hidden text-ellipsis text-sub-text flex flex-row">
                <Link
                  href={`/series/${movie.series.id}`}
                  className="text-text no-underline hover:underline overflow-hidden text-ellipsis block"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {movie.series.title}
                </Link>
              </span>
            </div>
          ) : (
            <User user={movie.author} size={"2"} />
          )}
        </div>
      </div>
    );
  }

  const getThumbnailClasses = () => {
    if (type === "row") {
      return "mb-[7px]";
    }
    if (type === "minColumn") {
      return "w-[100px] h-14";
    }
    return "";
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
    if (type === "row") {
      return "text-[17px] leading-5 font-bold max-h-10 text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-normal block tracking-[0]";
    }
    if (type === "minColumn") {
      return "my-0 mb-1 text-sm leading-4 max-h-8 text-ellipsis overflow-hidden block text-[var(--color-text)] tracking-[0] whitespace-normal";
    }
    return "text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-normal block tracking-[0]";
  };

  const getSeriesTitleClasses = () => {
    if (type === "row") {
      return "h-[18px] leading-[18px] text-[13px] text-ellipsis overflow-hidden text-[var(--color-sub-text)] tracking-[0] flex flex-row";
    }
    if (type === "minColumn") {
      return "leading-[18px] font-normal text-[13px] max-h-[18px] text-ellipsis overflow-hidden text-[var(--color-sub-text)] tracking-[0] flex flex-row";
    }
    return "overflow-hidden text-ellipsis tracking-[0] text-[var(--color-sub-text)] flex flex-row";
  };

  const getSeriesTitleStyle = () => {
    if (type === "row" || type === "minColumn") {
      return {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical" as const,
        WebkitLineClamp: 1,
      };
    }
    return {};
  };

  return (
    <Link
      href={`/movies/${movie.id}`}
      className={getWrapperClasses()}
      ref={ref}
    >
      {index !== undefined && (
        <span className="w-6 leading-[56px] text-xs text-center">
          {index === "active" ? "▶" : index}
        </span>
      )}
      <div className={getThumbnailClasses()}>
        <Thumbnail movie={movie} />
      </div>
      <div className={getTitlesClasses()}>
        <span
          className={getTitleClasses()}
          style={
            type === "minColumn"
              ? {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }
              : {}
          }
        >
          {movie.title}
        </span>
        {showSeries && movie.series ? (
          <span
            className={getSeriesTitleClasses()}
            style={getSeriesTitleStyle()}
          >
            <Link
              href={`/series/${movie.series.id}`}
              className="text-sub-text no-underline decoration-current hover:underline"
            >
              <span>{movie.series.title}</span>
            </Link>
            ・
            <Link
              href={`/users/${movie.author.id}`}
              className="text-sub-text no-underline decoration-current hover:underline"
            >
              <span>{movie.author.name}</span>
            </Link>
          </span>
        ) : (
          <Link
            href={`/users/${movie.author.id}`}
            className="text-sub-text no-underline decoration-current hover:underline"
          >
            <span
              className={getSeriesTitleClasses()}
              style={getSeriesTitleStyle()}
            >
              {movie.author.name}
            </span>
          </Link>
        )}
      </div>
    </Link>
  );
};

const MovieCard = forwardRef(MovieCard_);
export { MovieCard };
