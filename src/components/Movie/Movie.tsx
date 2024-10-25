import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

import { FilteredMovie } from "@/@types/v4Api";
import { Thumbnail } from "@/components/Thumbnail";

import Styles from "./Movie.module.scss";

export type props = {
  movie: FilteredMovie;
  type: "row" | "column" | "minColumn";
  index?: number | "active";
};

const MovieCard_ = (
  { movie, index, type }: props,
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
          <Link href={`/series/${movie.series?.id}`}>
            <span className={Styles.seriesTitle}>{movie.series?.title}</span>
          </Link>
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
        <span className={Styles.index}>
          {index === "active" ? "▶" : index}
        </span>
      )}
      <div className={Styles.thumbnail}>
        <Thumbnail movie={movie} />
      </div>
      <div className={Styles.titles}>
        <span className={Styles.title}>{movie.title}</span>
        <span className={Styles.seriesTitle}>{movie.author.name}</span>
      </div>
    </Link>
  );
};

const MovieCard = forwardRef(MovieCard_);
export { MovieCard };
