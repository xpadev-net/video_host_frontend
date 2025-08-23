import { Skeleton } from "@radix-ui/themes";
import Styles from "@/components/MovieInfo/MovieInfo.module.scss";
import { UserSkeleton } from "@/components/User/UserSkeleton";

type Props = {
  className?: string;
};

const MovieInfoSkeleton = ({ className }: Props) => {
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <div className={Styles.titleWrapper}>
        <Skeleton height="32px" width="300px" className={Styles.title} />
        <Skeleton height="20px" width="100px" className={Styles.postDate} />
      </div>
      <div className={Styles.author}>
        <UserSkeleton />
      </div>
      <div className={Styles.series}>
        <Skeleton height="16px" width="200px" />
        <Skeleton height="24px" width="250px" className={Styles.link} />
      </div>
    </div>
  );
};

export { MovieInfoSkeleton };
