import Link from "next/link";

import type { FilteredMovie } from "@/@types/v4Api";
import { User } from "@/components/User/User";

type props = {
  data: FilteredMovie;
  className?: string;
};

const MovieInfo = ({ data, className }: props) => {
  return (
    <div className={className}>
      <div className="border-b border-[var(--color-quaternary-background)] mb-2.5">
        <div className="text-[18px]">{data.title}</div>
        <div className="text-[14px] text-[var(--color-sub-text)] mb-2.5">
          {new Date(data.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="pb-2.5 border-b border-[var(--color-quaternary-background)] mb-2.5 flex flex-row gap-2 items-center">
        <User user={data.author} />
      </div>
      <div className="text-[14px] pb-2.5 leading-5">
        <p>この動画を含むプレイリスト</p>
        <Link
          className="text-[var(--color-sub-text)] no-underline hover:underline"
          href={`/series/${data.series?.id}`}
        >
          {data.series?.title}
        </Link>
      </div>
    </div>
  );
};
export { MovieInfo };
