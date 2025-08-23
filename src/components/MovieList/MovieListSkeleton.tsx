import { MovieCardSkeleton } from "@/components/Movie/MovieCardSkeleton";

import Styles from "./MovieList.module.scss";

export type Props = {
  type: "row" | "column" | "minColumn";
  className?: string;
  count?: number;
  showSeries?: boolean;
};

const MovieListSkeleton = ({
  type,
  className,
  count = 6,
  showSeries,
}: Props) => {
  return (
    <div className={`${className} ${Styles.wrapper} ${Styles[type]}`}>
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items don't have stable IDs
        <MovieCardSkeleton key={index} type={type} showSeries={showSeries} />
      ))}
    </div>
  );
};

export { MovieListSkeleton };
