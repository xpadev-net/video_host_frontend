import { useAtom } from "jotai";
import Image from "next/image";

import type { ThumbnailProps } from "@/@types/Thumbnail";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { time2str } from "@/libraries/time";

import Styles from "./Thumbnail.module.scss";

const Thumbnail = ({ movie }: ThumbnailProps) => {
  const [history] = useAtom(watchedHistoryAtom);

  return (
    <div className={Styles.wrapper}>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${movie.url}`}
        alt={`${movie.seriesTitle} ${movie.title}`}
        fill={true}
        sizes={"360px"}
      />
      <div
        className={Styles.watched}
        style={{
          width: `${(history[movie.url]?.watched || 0) * 100}%`,
        }}
      />
      <span className={Styles.duration}>{time2str(movie.duration)}</span>
    </div>
  );
};
export { Thumbnail };
