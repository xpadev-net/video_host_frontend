import type { MovieProps } from "@/@types/Movie";
import { Thumbnail } from "@/components/Thumbnail/Thumbnail";
import Link from "next/link";
import Styles from "./Movie.module.scss";

const Movie = ({ movie, index, type }: MovieProps) => {
  return (
    <Link
      href={`/movie/${movie.url}`}
      className={`${Styles.wrapper} ${Styles[type]}`}
    >
      {index !== undefined && <span>{index === "active" ? "▶" : index}</span>}
      <div className={Styles.thumbnail}>
        <Thumbnail movie={movie} />
      </div>
      <div className={Styles.titles}>
        <span className={Styles.movieTitle}>{movie.movieTitle}</span>
        <span className={Styles.title}>{movie.title}</span>
      </div>
    </Link>
  );
};
export { Movie };
