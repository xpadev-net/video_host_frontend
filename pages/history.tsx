import { useAtomValue } from "jotai";
import { watchedHistoryAtom } from "@/atoms/WatchedHistory";
import { MovieList } from "@/components/MovieList/MovieList";
import Styles from "@/styles/history.module.scss";

const History = () => {
  const history = useAtomValue(watchedHistoryAtom);

  const historyList = Object.keys(history).map((key) => {
    return history[key].movie.movie;
  });

  return (
    <div className={Styles.wrapper}>
      <MovieList movies={historyList} type={"column"} />
    </div>
  );
};

export default History;
