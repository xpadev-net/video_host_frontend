import { MovieInfoSkeleton } from "@/components/MovieInfo/MovieInfoSkeleton";
import { PlayerSkeleton } from "@/components/Player/PlayerSkeleton";
import { PlayListSkeleton } from "@/components/PlayList/PlayListSkeleton";

const MoviePageSkeleton = () => {
  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-[1fr_minmax(300px,400px)] gap-6 max-[1000px]:grid-cols-1">
        <div className="min-w-[640px] max-[1000px]:min-w-0">
          <PlayerSkeleton />
        </div>
        <MovieInfoSkeleton className="min-w-[640px] max-[1000px]:min-w-0" />
        <div className="col-start-2 row-start-1 row-span-2 max-[1000px]:col-auto max-[1000px]:row-auto">
          <PlayListSkeleton className="max-[1000px]:!max-h-none" />
        </div>
      </div>
    </div>
  );
};

export { MoviePageSkeleton };
