import { Tabs } from "@radix-ui/themes";
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
      <h1>{`検索: ${query}`}</h1>
      <Tabs.Root defaultValue={"series"} className={Styles.tab}>
        <Tabs.List className={Styles.list}>
          <Tabs.Trigger value="series">シリーズ</Tabs.Trigger>
          <Tabs.Trigger value="movies">動画</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="series">
          <SeriesSearchList query={`${query}`} />
        </Tabs.Content>
        <Tabs.Content value="movies">
          <MoviesSearchList query={`${query}`} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default SearchPage;
