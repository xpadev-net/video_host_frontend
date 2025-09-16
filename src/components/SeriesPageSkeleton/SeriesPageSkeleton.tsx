import { Skeleton } from "@radix-ui/themes";

import { MovieListSkeleton } from "@/components/MovieList/MovieListSkeleton";
import { UserSkeleton } from "@/components/User/UserSkeleton";

const SeriesPageSkeleton = () => {
  return (
    <div className={"p-6 pt-3 max-w-[1070px] mx-auto"}>
      <div className="sticky top-0 z-10 bg-background py-4 flex flex-col gap-2">
        <Skeleton height="32px" width="300px" />
        <UserSkeleton size="1" />
      </div>
      <div>
        <MovieListSkeleton type="column" count={8} />
      </div>
    </div>
  );
};

export { SeriesPageSkeleton };
