import { MovieItem } from "@/@types/api";
import Link from "next/link";
import Styles from "@/components/MovieInfo/MovieInfo.module.scss";

type props = {
  data: MovieItem;
  className?: string;
};

const MovieInfo = ({ data, className }: props) => {
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div>{data.movie.title}</div>
      <Link href={`/series/${data.movie.seriesUrl}`}>
        {data.movie.seriesTitle}
      </Link>
    </div>
  );
};
export { MovieInfo };
