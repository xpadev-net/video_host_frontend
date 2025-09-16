import { MovieCardSkeleton } from "@/components/Movie/MovieCardSkeleton";

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
  const getWrapperClasses = () => {
    const baseClasses = "flex relative";
    const typeClasses = {
      row: "flex-row overflow-x-scroll max-w-screen",
      column: "flex-col",
      minColumn: "flex-col",
    };
    return `${className || ""} ${baseClasses} ${typeClasses[type]}`;
  };

  return (
    <div className={getWrapperClasses()}>
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items don't have stable IDs
        <MovieCardSkeleton key={index} type={type} showSeries={showSeries} />
      ))}
    </div>
  );
};

export { MovieListSkeleton };
