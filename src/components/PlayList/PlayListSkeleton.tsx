import { Skeleton } from "@radix-ui/themes";

import { MovieListSkeleton } from "@/components/MovieList/MovieListSkeleton";
import Styles from "@/components/PlayList/PlayList.module.scss";

type Props = {
  className?: string;
  maxHeight?: number;
};

const PlayListSkeleton = ({ className, maxHeight }: Props) => {
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={`${Styles.header} ${Styles.open} ${Styles.hasNext}`}>
        <Skeleton height="20px" width="80%" />
      </div>
      <div
        className={`${Styles.playListWrapper} ${Styles.open}`}
        style={{ maxHeight }}
      >
        <MovieListSkeleton type="minColumn" count={4} />
      </div>
    </div>
  );
};

export { PlayListSkeleton };
