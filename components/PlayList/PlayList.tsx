import { MovieList } from "@/components/MovieList/MovieList";
import Styles from "@/components/PlayList/PlayList.module.scss";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlaylistPlay,
} from "@mui/icons-material";
import { MovieItem } from "@/@types/api";
import { useState } from "react";

type props = {
  data: MovieItem;
  className?: string;
};

const PlayList = ({ data, className }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`${Styles.wrapper} ${className}`}>
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
