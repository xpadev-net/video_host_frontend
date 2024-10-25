import { useAtomValue } from "jotai";
import Image from "next/image";

import type { ThumbnailProps } from "@/@types/Thumbnail";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { time2str } from "@/libraries/time";

import Styles from "./Thumbnail.module.scss";

const Thumbnail = ({ movie }: ThumbnailProps) => {
  const history = useAtomValue(watchedHistoryAtom);

  return (
    <div className={Styles.wrapper}>
      <Image
        src={movie.thumbnailUrl??""}
        alt={`${movie.series?.title} ${movie.title}`}
        fill={true}
        sizes={"360px"}
        className={Styles.image}
      />
      <div
        className={Styles.watched}
        style={{
          width: `${(history[movie.id]?.watched || 0) * 100}%`,
        }}
      />
      <span className={Styles.duration}>{time2str(movie.duration)}</span>
    </div>
  );
};
export { Thumbnail };
