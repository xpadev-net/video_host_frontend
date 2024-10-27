import Head from "next/head";
import { useRouter } from "next/router";

import { MovieList } from "@/components/MovieList";
import { User } from "@/components/User/User";
import { SiteName } from "@/contexts/env";
import { useSeries } from "@/hooks/useSeries";
import Styles from "@/styles/search.module.scss";
import { query2str } from "@/utils/query2str";

const SeriesPage = () => {
  const router = useRouter();
  const query = router.query.series;
  const { data } = useSeries(query2str(query));
  if (!data) {
    return <></>;
  }
  if (data.code === 401) {
    void router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
    return <></>;
  }
  if (data.status !== "ok") {
    return (
      <div>
        <h2>見つかりませんでした</h2>
      </div>
    );
  }
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`${data.data.title} - ${SiteName}`}</title>
      </Head>
      <div className={Styles.moviesWrapper}>
        <div className={Styles.header}>
          <h1>{data.data.title}</h1>
          <User user={data.data.author} />
        </div>
        <div className={Styles.moviesContainer}>
          <MovieList movies={data.data.movies ?? []} type={"column"} />
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;
