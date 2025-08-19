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
    return null;
  }
  if (data.code === 401) {
    void router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
    return null;
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
      <div className="sticky top-0 z-10 bg-background py-4 flex flex-col gap-2">
        <h1 className="text-2xl">{data.data.title}</h1>
        <User user={data.data.author} size="1" />
      </div>
      <div className={Styles.moviesContainer}>
        <MovieList movies={data.data.movies ?? []} type={"column"} />
      </div>
    </div>
  );
};

export default SeriesPage;
