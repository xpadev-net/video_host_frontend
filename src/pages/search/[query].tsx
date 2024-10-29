import Head from "next/head";
import { useRouter } from "next/router";

import { MoviesSearchList } from "@/components/SearchList/MoviesSearchList";
import { SeriesSearchList } from "@/components/SearchList/SeriesSearchList";
import { SiteName } from "@/contexts/env";
import Styles from "@/styles/search.module.scss";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.query;
  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`検索: ${query} - ${SiteName}`}</title>
      </Head>
      <SeriesSearchList query={query as string} />
      <MoviesSearchList query={query as string} />
    </div>
  );
};

export default SearchPage;
