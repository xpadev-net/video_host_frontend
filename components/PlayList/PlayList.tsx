import { MovieList } from "@/components/MovieList/MovieList";
import Styles from "@/components/PlayList/PlayList.module.scss";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlaylistPlay,
} from "@mui/icons-material";
import { MovieItem } from "@/@types/api";
import { useState } from "react";
import styled from "styled-components";

type props = {
  data: MovieItem;
  className?: string;
  maxHeight?: number;
};

type WrapperProps = {
  maxHeight?: number;
};

const Wrapper = styled.div.attrs<WrapperProps>(({ maxHeight }) => ({
  style: {
    maxHeight: maxHeight ? `${maxHeight}px` : "none",
  },
}))<WrapperProps>``;

const PlayList = ({ data, className, maxHeight }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Wrapper className={`${Styles.wrapper} ${className}`} maxHeight={maxHeight}>
      <div
        className={`${Styles.header} ${isOpen && Styles.open}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <PlaylistPlay className={Styles.icon} />
        <div className={Styles.textWrapper}>
          {data.next && !isOpen && (
            <span className={Styles.nextTitle}>次: {data.next.title}</span>
          )}
          <span className={Styles.title}>{data.movie.seriesTitle}</span>
        </div>
        {isOpen ? (
          <KeyboardArrowUp className={Styles.icon} />
        ) : (
          <KeyboardArrowDown className={Styles.icon} />
        )}
      </div>
      {isOpen && (
        <MovieList
          movies={data.playlist}
          type={"minColumn"}
          active={data.movie.url}
          className={Styles.list}
        />
      )}
    </Wrapper>
  );
};

export { PlayList };
