import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlaylistPlay,
} from "@mui/icons-material";
import { useState } from "react";

import { MovieItem } from "@/@types/api";
import { MovieList } from "@/components/MovieList";
import Styles from "@/components/PlayList/PlayList.module.scss";

type props = {
  data: MovieItem;
  className?: string;
  maxHeight?: number;
};

const PlayList = ({ data, className, maxHeight }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`${Styles.wrapper} ${className}`}
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : "none",
      }}
    >
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
    </div>
  );
};

export { PlayList };
