import type { MovieProps, WrapperProps } from "@/@types/Movie";
import { Thumbnail } from "@/components/Thumbnail/Thumbnail";
import Link from "next/link";
import Styles from "./Movie.module.scss";
import styled from "styled-components";

const Wrapper = styled.div<WrapperProps>`
  width: ${(p) => (p.itemWidth === undefined ? "unset" : `${p.itemWidth}px`)};
`;

const Movie = ({ movie, index, type, itemWidth }: MovieProps) => {
  return (
    <Link
      href={`/movie/${movie.url}`}
      className={`${Styles.wrapper} ${Styles[type]}`}
    >
      <Wrapper itemWidth={itemWidth}>
        {index !== undefined && <span>{index === "active" ? "▶" : index}</span>}
        <div className={Styles.thumbnail}>
          <Thumbnail movie={movie} />
        </div>
        <div className={Styles.titles}>
          <span className={Styles.movieTitle}>{movie.movieTitle}</span>
          <span className={Styles.title}>{movie.title}</span>
        </div>
      </Wrapper>
    </Link>
  );
};
export { Movie };
