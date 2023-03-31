import type { Movie } from "@/@types/Movie";
import { Thumbnail } from "@/components/Thumbnail/Thumbnail";
import Link from "next/link";
import Styles from "./Movie.module.scss";
import { ForwardedRef, forwardRef } from "react";

export type props = {
  movie: Movie;
  type: "row" | "column" | "minColumn";
  index?: number | "active";
};

const MovieCard_ = (
  { movie, index, type }: props,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  if (type === "column") {
    return (
      <div className={`${Styles.wrapper} ${Styles[type]}`}>
        <Link className={Styles.thumbnail} href={`/movie/${movie.url}`}>
          <Thumbnail movie={movie} />
        </Link>
        <div className={Styles.titles}>
          <Link href={`/movie/${movie.url}`}>
            <span className={Styles.title}>{movie.title}</span>
          </Link>
          <Link href={`/series/${movie.seriesUrl}`}>
            <span className={Styles.seriesTitle}>{movie.seriesTitle}</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <Link
      href={`/movie/${movie.url}`}
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
        <span className={Styles.seriesTitle}>{movie.seriesTitle}</span>
      </div>
    </Link>
  );
};

const MovieCard = forwardRef(MovieCard_);
export { MovieCard };
