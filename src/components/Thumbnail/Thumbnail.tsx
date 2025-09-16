import { useAtomValue } from "jotai";

import type { FilteredMovie } from "@/@types/v4Api";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { time2str } from "@/libraries/time";

export type ThumbnailProps = {
  movie?: FilteredMovie;
  hideMetadata?: boolean;
};

const Thumbnail = ({ movie, hideMetadata }: ThumbnailProps) => {
  const history = useAtomValue(watchedHistoryAtom);

  return (
    <div className="relative aspect-video w-full h-full overflow-hidden bg-[var(--gray-1)] rounded-[4px]">
      {movie?.thumbnailUrl && (
        <ImageWithFallback
          src={movie.thumbnailUrl ?? ""}
          alt={`${movie.series?.title} ${movie.title}`}
          fill={true}
          sizes={"360px"}
          className="object-cover"
        />
      )}
      {movie && !hideMetadata && (
        <>
          <div
            className="absolute bottom-0 left-0 h-[3px] block bg-[var(--color-accent)]"
            style={{
              width: `${(history[movie?.id]?.watched || 0) * 100}%`,
            }}
          />
          <span className="absolute bottom-0 right-0 m-1 px-[4px] py-[3px] bg-[var(--gray-1)] text-[var(--gray-12)] rounded-[2px] h-[18px] text-[12px] leading-[12px]">
            {time2str(movie.duration)}
          </span>
        </>
      )}
    </div>
  );
};
export { Thumbnail };
