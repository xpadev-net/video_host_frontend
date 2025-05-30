import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

import { FilteredMovie } from "@/@types/v4Api";
import { findNext, findPrev } from "@/components/Player/utils/findPrevNext";

type props = {
  className?: string;
  type: "prev" | "next";
  data: FilteredMovie;
};

const PrevNextButton = ({ className, type, data }: props) => {
  const router = useRouter();

  const item = type === "prev" ? findPrev(data) : findNext(data);

  if (!item) return <></>;
  const onPrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void router.push(`/movies/${item.id}`);
  };
  return (
    <button onClick={onPrevClick} className={className}>
      {type === "prev" ? <MdSkipPrevious /> : <MdSkipNext />}
    </button>
  );
};

export { PrevNextButton };
