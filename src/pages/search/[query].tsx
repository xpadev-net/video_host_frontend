import Head from "next/head";
import { useRouter } from "next/router";

import { MoviesSearchList } from "@/components/SearchList/MoviesSearchList";
import { SeriesSearchList } from "@/components/SearchList/SeriesSearchList";
import { type TabItem, TabSwitcher } from "@/components/TabSwitcher";
import { SiteName } from "@/contexts/env";
import Styles from "@/styles/search.module.scss";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.query;

  const tabs: TabItem[] = [
    {
      value: "series",
      label: "シリーズ",
      content: <SeriesSearchList query={query as string} />,
    },
    {
      value: "movies",
      label: "動画",
      content: <MoviesSearchList query={query as string} />,
    },
  ];

  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`検索: ${query} - ${SiteName}`}</title>
      </Head>
      <TabSwitcher tabs={tabs} defaultValue="series" />
    </div>
  );
};

export default SearchPage;
