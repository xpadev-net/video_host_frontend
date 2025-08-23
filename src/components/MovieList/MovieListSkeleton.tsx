import { MovieCardSkeleton } from "@/components/Movie/MovieCardSkeleton";

import Styles from "./MovieList.module.scss";

export type Props = {
  type: "row" | "column" | "minColumn";
  className?: string;
  count?: number;
};

const MovieListSkeleton = ({ type, className, count = 6 }: Props) => {
  return (
    <div className={`${className} ${Styles.wrapper} ${Styles[type]}`}>
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <MovieCardSkeleton key={index} grid={type === "row"} />
      ))}
    </div>
  );
};

export { MovieListSkeleton };
