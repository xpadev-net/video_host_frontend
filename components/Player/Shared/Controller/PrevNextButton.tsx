import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

import { MovieItemAtom } from "@/atoms/Player";
import { SkipNext, SkipPrevious } from "@/components/icons";

type props = {
  className?: string;
  type: "prev" | "next";
};

const PrevNextButton = ({ className, type }: props) => {
  const router = useRouter();
  const data = useAtomValue(MovieItemAtom);

  const item = data?.[type];
  if (!item) return <></>;
  const onPrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void router.push(`/movie/${item.url}`);
  };
  return (
    <button onClick={onPrevClick} className={className}>
      {type === "prev" ? <SkipPrevious /> : <SkipNext />}
    </button>
  );
};

export { PrevNextButton };
