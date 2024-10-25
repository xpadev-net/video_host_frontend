import Link from "next/link";

import {FilteredMovie} from "@/@types/v4Api";
import Styles from "@/components/MovieInfo/MovieInfo.module.scss";

type props = {
  data: FilteredMovie;
  className?: string;
};

const MovieInfo = ({ data, className }: props) => {
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={Styles.titleWrapper}>
        <div className={Styles.title}>{data.title}</div>
        <div className={Styles.postDate}>
          {new Date(data.createdAt).toLocaleDateString()}
        </div>
      </div>
      <Link href={`/series/${data.series?.id}`}>
        {data.series?.title}
      </Link>
    </div>
  );
};
export { MovieInfo };
