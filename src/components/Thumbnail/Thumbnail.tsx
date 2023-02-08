import styled from "styled-components";
import Styles from "./Thumbnail.module.scss";
import Image from "next/image";
import type { ThumbnailProps, WatchedProps } from "@/@types/Thumbnail";
import { useAtom } from "jotai";
import { watchedHistory } from "@/atoms/WatchedHistory";
import { time2str } from "@/libraries/time";

const WatchedProgress = styled.div<WatchedProps>`
  width: ${(p) => p.itemWidth}%;
`;

const Thumbnail = ({ movie }: ThumbnailProps) => {
  const [history] = useAtom(watchedHistory);

  return (
    <div className={Styles.wrapper}>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${movie.url}`}
        alt={`${movie.title} ${movie.movieTitle}`}
        fill={true}
        sizes={"360px"}
      />
      <WatchedProgress
        itemWidth={(history[movie.url] || 0) / 100}
        className={Styles.watched}
      />
      <span className={Styles.duration}>{time2str(movie.duration)}</span>
    </div>
  );
};
export { Thumbnail };
