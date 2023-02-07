import styled from "styled-components";
import Styles from "./Thumbnail.module.scss";
import Image from "next/image";
import { ThumbnailProps, WatchedProps } from "@/@types/Thumbnail";
import { useAtom } from "jotai/react/useAtom";
import { watchedHistory } from "@/atoms/WatchedHistory";

const WatchedProgress = styled.div<WatchedProps>`
  width: ${(p) => p.itemWidth}%;
`;

const Thumbnail = ({ movie }: ThumbnailProps) => {
  const [history] = useAtom(watchedHistory);
  const progress = (history[movie.url] || 0) / 100;
  return (
    <div className={Styles.wrapper}>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${movie.url}`}
        alt={`${movie.title} ${movie.episodeTitle}`}
        fill={true}
      />
      <WatchedProgress itemWidth={progress} className={Styles.watched} />
    </div>
  );
};
export { Thumbnail };
