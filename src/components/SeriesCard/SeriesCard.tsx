import Link from "next/link";
import type { FC } from "react";

import type { FilteredSeries } from "@/@types/v4Api";
import { Thumbnail } from "@/components/Thumbnail";
import { User } from "@/components/User/User";

type SeriesCardProps = {
  series: FilteredSeries;
};

export const SeriesCard: FC<SeriesCardProps> = ({ series }) => {
  return (
    <Link
      className="flex flex-row p-2 rounded-xl hover:bg-[var(--color-hover)]"
      href={`/series/${series.id}`}
    >
      <div className="max-w-[40%] w-[357px]">
        <Thumbnail movie={series.movies?.[0]} hideMetadata={true} />
      </div>
      <div className="flex-1 pl-[10px] flex flex-col gap-3">
        <span className="text-lg text-[var(--color-text)]">{series.title}</span>
        <User user={series.author} size={"2"} />
      </div>
    </Link>
  );
};
