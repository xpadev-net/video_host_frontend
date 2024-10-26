import Link from "next/link";

import { FilteredMovie } from "@/@types/v4Api";
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
      <div className={Styles.author}>{data.author.name}</div>
      <div className={Styles.series}>
        <p>この動画を含むプレイリスト</p>
        <Link className={Styles.link} href={`/series/${data.series?.id}`}>
          {data.series?.title}
        </Link>
      </div>
    </div>
  );
};
export { MovieInfo };
