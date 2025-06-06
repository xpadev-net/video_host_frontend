import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { FilteredMovie } from "@/@types/v4Api";
import { SeriesList } from "@/components/MovieList/SeriesList";
import { findNext } from "@/components/Player/utils/findPrevNext";
import Styles from "@/components/PlayList/PlayList.module.scss";
import { visibility2str } from "@/utils/visibility2str";

type props = {
  data: FilteredMovie;
  className?: string;
  maxHeight?: number;
};

const PlayList = ({ data, className, maxHeight }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  const next = findNext(data);

  if (!data.series) {
    return null;
  }

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
        <div className={Styles.row}>
          <div className={Styles.textWrapper}>
            {next && !isOpen && (
              <span className={Styles.nextTitle}>次: {next.title}</span>
            )}
            <span className={Styles.title}>{data.series.title}</span>
          </div>
          {isOpen && (
            <div className={Styles.description}>
              {data.series.visibility !== "PUBLIC" && (
                <>
                  <span className={Styles.visibility}>
                    {visibility2str(data.series.visibility)}
                  </span>
                  ・
                </>
              )}
              <Link
                href={`/users/${data.series.author.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={Styles.author}>{data.series.author.name}</span>
              </Link>
            </div>
          )}
        </div>
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
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
