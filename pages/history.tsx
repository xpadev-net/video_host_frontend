import { useAtomValue } from "jotai";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { MovieList } from "@/components/MovieList";
import Styles from "@/styles/history.module.scss";
import Head from "next/head";

const History = () => {
  const history = useAtomValue(watchedHistoryAtom);

  const historyList = Object.keys(history).map((key) => {
    return history[key].movie.movie;
  });

  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{`履歴 - ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <MovieList movies={historyList} type={"column"} />
    </div>
  );
};

export default History;
