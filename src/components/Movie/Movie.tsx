import Link from "next/link";
import { type ForwardedRef, forwardRef } from "react";

import type { FilteredMovie } from "@/@types/v4Api";
import { Thumbnail } from "@/components/Thumbnail";
import { User } from "@/components/User/User";

import Styles from "./Movie.module.scss";

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
  if (type === "column") {
    return (
      <div className={`${Styles.wrapper} ${Styles[type]}`}>
        <Link className={Styles.thumbnail} href={`/movies/${movie.id}`}>
          <Thumbnail movie={movie} />
        </Link>
        <div className={Styles.titles}>
          <Link href={`/movies/${movie.id}`}>
            <span className={Styles.title}>{movie.title}</span>
          </Link>
          {showSeries && movie.series ? (
            <div className={Styles.list}>
              <User user={movie.author} size={"2"} />・
              <span className={Styles.seriesTitle}>
                <Link
                  href={`/series/${movie.series.id}`}
                  className={Styles.link}
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
  return (
    <Link
      href={`/movies/${movie.id}`}
      className={`${Styles.wrapper} ${Styles[type]}`}
      ref={ref}
    >
      {index !== undefined && (
        <span className={Styles.index}>{index === "active" ? "▶" : index}</span>
      )}
      <div className={Styles.thumbnail}>
        <Thumbnail movie={movie} />
      </div>
      <div className={Styles.titles}>
        <span className={Styles.title}>{movie.title}</span>
        {showSeries && movie.series ? (
          <span className={Styles.seriesTitle}>
            <Link href={`/series/${movie.series.id}`} className={Styles.link}>
              <span>{movie.series.title}</span>
            </Link>
            ・
            <Link href={`/users/${movie.author.id}`} className={Styles.link}>
              <span>{movie.author.name}</span>
            </Link>
          </span>
        ) : (
          <Link href={`/users/${movie.author.id}`}>
            <span className={Styles.seriesTitle}>{movie.author.name}</span>
          </Link>
        )}
      </div>
    </Link>
  );
};

const MovieCard = forwardRef(MovieCard_);
export { MovieCard };
