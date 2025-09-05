import Head from "next/head";
import { useRouter } from "next/router";

import { MoviesSearchList } from "@/components/SearchList/MoviesSearchList";
import { SeriesSearchList } from "@/components/SearchList/SeriesSearchList";
import { type TabItem, TabSwitcher } from "@/components/TabSwitcher";
import { User } from "@/components/User/User";
import { SiteName } from "@/contexts/env";
import { useUser } from "@/hooks/useUser";

const UserPage = () => {
  const router = useRouter();
  const query = router.query.user;
  const { data: user, isLoading } = useUser(query as string);

  if (isLoading || !user) {
    return null;
  }

  if (user.status !== "ok") {
    return (
      <div className={"p-6 pt-3 max-w-[1070px] mx-auto"}>
        <h1>読み込みに失敗しました</h1>
        <span>
          {user.code} - {user.message}
        </span>
      </div>
    );
  }

  const tabs: TabItem[] = [
    {
      value: "series",
      label: "シリーズ",
      content: <SeriesSearchList author={user.data.id} />,
    },
    {
      value: "movies",
      label: "動画",
      content: <MoviesSearchList author={user.data.id} />,
    },
  ];

  return (
    <div className={"p-6 pt-3 max-w-[1070px] mx-auto"}>
      <Head>
        <title>{`${user.data.name} - ${SiteName}`}</title>
      </Head>
      <User user={user.data} size={"4"} />
      <TabSwitcher tabs={tabs} defaultValue="series" />
    </div>
  );
};

export default UserPage;
