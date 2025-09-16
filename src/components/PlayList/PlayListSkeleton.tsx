import { Skeleton } from "@radix-ui/themes";

import { MovieListSkeleton } from "@/components/MovieList/MovieListSkeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  maxHeight?: number;
};

const PlayListSkeleton = ({ className, maxHeight }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col select-none max-h-[min(700px,50vh)] rounded-xl border border-[var(--color-quaternary-background)] overflow-hidden",
        className,
      )}
    >
      <div className="flex h-[60px] py-1 px-4 shrink-0 bg-[var(--color-thirdly-background)] flex-row items-center">
        <Skeleton height="20px" width="80%" />
      </div>
      <div className="open" style={{ maxHeight }}>
        <MovieListSkeleton type="minColumn" count={4} />
      </div>
    </div>
  );
};

export { PlayListSkeleton };
