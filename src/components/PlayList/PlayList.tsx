import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import type { FilteredMovie } from "@/@types/v4Api";
import { SeriesList } from "@/components/MovieList/SeriesList";
import { findNext } from "@/components/Player/utils/findPrevNext";
import { cn } from "@/lib/utils";
import { visibility2str } from "@/utils/visibility2str";

type props = {
  data: FilteredMovie;
  className?: string;
  maxHeight?: number;
};

const PlayList = ({ data, className, maxHeight }: props) => {
  const [isOpen, setIsOpen] = useState(true);
  const next = findNext(data);

  const handleToggleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((pv) => !pv);
    }
  };

  if (!data.series) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col select-none max-h-[min(700px,50vh)] rounded-xl border border-[var(--color-quaternary-background)] overflow-hidden",
        className,
      )}
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : "none",
      }}
    >
      <button
        className="flex h-[60px] py-1 px-4 shrink-0 bg-[var(--color-thirdly-background)] flex-row items-center"
        onClick={() => setIsOpen((pv) => !pv)}
        onKeyDown={handleToggleKeyDown}
        type="button"
        tabIndex={0}
        aria-label={isOpen ? "Collapse playlist" : "Expand playlist"}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col flex-1">
          <div className="flex flex-col leading-[25px] flex-1 align-middle justify-center text-left">
            {next && !isOpen && (
              <span className="leading-[25px] truncate">次: {next.title}</span>
            )}
            <span
              className={cn(
                "truncate",
                isOpen || !next
                  ? "text-[var(--color-text)] leading-[25px]"
                  : "text-xs text-[var(--color-sub-text)] leading-6",
              )}
            >
              {data.series.title}
            </span>
          </div>
          {(isOpen || !next) && (
            <div className="flex flex-row justify-start text-[var(--color-sub-text)]">
              {data.series.visibility !== "PUBLIC" && (
                <>
                  <span className="text-xs text-[var(--color-sub-text)] leading-6 truncate hover:underline">
                    {visibility2str(data.series.visibility)}
                  </span>
                  ・
                </>
              )}
              <Link
                href={`/users/${data.series.author.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs text-[var(--color-sub-text)] leading-6 truncate hover:underline">
                  {data.series.author.name}
                </span>
              </Link>
            </div>
          )}
        </div>
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
      {isOpen && data.series && (
        <SeriesList
          series={data.series}
          type={"minColumn"}
          active={data.id}
          className="border-t border-[var(--color-quaternary-background)] overflow-y-scroll"
        />
      )}
    </div>
  );
};

export { PlayList };
