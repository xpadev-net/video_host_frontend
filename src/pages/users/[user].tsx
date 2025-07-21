import { Tabs } from "@radix-ui/themes";
import Head from "next/head";
import { useRouter } from "next/router";

import { MoviesSearchList } from "@/components/SearchList/MoviesSearchList";
import { SeriesSearchList } from "@/components/SearchList/SeriesSearchList";
import { User } from "@/components/User/User";
import { SiteName } from "@/contexts/env";
import { useUser } from "@/hooks/useUser";
import Styles from "@/styles/search.module.scss";

const UserPage = () => {
  const router = useRouter();
  const query = router.query.user;
  const { data: user, isLoading } = useUser(query as string);

  if (isLoading || !user) {
    return null;
  }

  if (user.status !== "ok") {
    return (
      <div className={Styles.wrapper}>
        <h1>読み込みに失敗しました</h1>
        <span>
          {user.code} - {user.message}
        </span>
      </div>
    );
  }

  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`${user.data.name} - ${SiteName}`}</title>
      </Head>
      <User user={user.data} size={"4"} />
      <Tabs.Root defaultValue={"series"} className={Styles.tab}>
        <Tabs.List className={Styles.list}>
          <Tabs.Trigger value="series">シリーズ</Tabs.Trigger>
          <Tabs.Trigger value="movies">動画</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="series">
          <SeriesSearchList author={user.data.id} />
        </Tabs.Content>
        <Tabs.Content value="movies">
          <MoviesSearchList author={user.data.id} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default UserPage;
