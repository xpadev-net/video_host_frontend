import { useState } from "react";

import { FilteredMovie } from "@/@types/v4Api";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlaylistPlay,
} from "@/components/icons";
import { SeriesList } from "@/components/MovieList/SeriesList";
import { findNext } from "@/components/Player/utils/findPrevNext";
import Styles from "@/components/PlayList/PlayList.module.scss";

type props = {
  data: FilteredMovie;
  className?: string;
  maxHeight?: number;
};

const PlayList = ({ data, className, maxHeight }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  const next = findNext(data);
  return (
    <div
      className={`${Styles.wrapper} ${className}`}
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : "none",
      }}
    >
      <div
        className={`${Styles.header} ${isOpen && Styles.open}`}
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <PlaylistPlay />
        <div className={Styles.textWrapper}>
          {next && !isOpen && (
            <span className={Styles.nextTitle}>次: {next.title}</span>
          )}
          <span className={Styles.title}>{data.series?.title}</span>
        </div>
        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </div>
      {isOpen && data.series && (
        <SeriesList
          series={data.series}
          type={"minColumn"}
          active={data.id}
          className={Styles.list}
        />
      )}
    </div>
  );
};

export { PlayList };
