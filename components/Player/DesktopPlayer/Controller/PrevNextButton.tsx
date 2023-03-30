import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { useRouter } from "next/router";
import { MovieItemAtom } from "@/atoms/Player";
import { useAtomValue } from "jotai";

type props = {
  className?: string;
  type: "prev" | "next";
};

const PrevNextButton = ({ className, type }: props) => {
  const router = useRouter();
  const data = useAtomValue(MovieItemAtom);

  const item = data?.[type];
  if (!item) return <></>;
  const onPrevClick = () => {
    void router.push(`/movie/${item.url}`);
  };
  return (
    <button onClick={onPrevClick} className={className}>
      {type === "prev" ? <SkipPrevious /> : <SkipNext />}
    </button>
  );
};

export { PrevNextButton };