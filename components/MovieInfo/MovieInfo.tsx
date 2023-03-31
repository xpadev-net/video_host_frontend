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
      <div className={Styles.titleWrapper}>
        <div className={Styles.title}>{data.movie.title}</div>
        <div className={Styles.postDate}>
          {new Date(data.movie.addAt * 1000).toLocaleDateString()}
        </div>
      </div>
      <Link href={`/series/${data.movie.seriesUrl}`}>
        {data.movie.seriesTitle}
      </Link>
    </div>
  );
};
export { MovieInfo };
