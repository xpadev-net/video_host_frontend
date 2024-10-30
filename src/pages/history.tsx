import { useAtomValue } from "jotai";
import Head from "next/head";

import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { MovieList } from "@/components/MovieList";
import { SiteName } from "@/contexts/env";
import Styles from "@/styles/history.module.scss";

const History = () => {
  const history = useAtomValue(watchedHistoryAtom);

  const historyList = Object.keys(history)
    .map((key) => {
      return history[key].movie;
    })
    .toReversed();

  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`履歴 - ${SiteName}`}</title>
      </Head>
      <MovieList movies={historyList} type={"column"} showSeries={true} />
    </div>
  );
};

export default History;
