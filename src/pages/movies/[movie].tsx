import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { PlayerConfigAtom, WrapperRefAtom } from "@/atoms/Player";
import { MovieInfo } from "@/components/MovieInfo";
import { Player } from "@/components/Player";
import { PlayList } from "@/components/PlayList";
import { SiteName } from "@/contexts/env";
import { useMovie } from "@/hooks/useMovie";
import { useIsMobile } from "@/libraries/isMobile";
import Styles from "@/styles/movie.module.scss";
import {query2str} from "@/utils/query2str";

const MoviePage = () => {
  const router = useRouter();
  const query = router.query.movie;
  const data = useMovie(query2str(query));
  console.log(data.isLoading, structuredClone(data.data));
  console.log(query);

  const { isTheatre } = useAtomValue(PlayerConfigAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const [playlistMaxHeight, setPlaylistMaxHeight] = useState<
    number | undefined
  >();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!wrapperRef) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const wrapper = entries[0];
      if (!wrapper) return;
      setPlaylistMaxHeight(wrapper.contentRect.height);
    });
    resizeObserver.observe(wrapperRef);
    return () => {
      resizeObserver.disconnect();
    };
  }, [wrapperRef]);
  if (!data.data) return <></>;
  if (data.data.status !== "ok") {
    return (
      <div>
        <h2>見つかりませんでした</h2>
      </div>
    );
  }
  return (
    <div
      className={`${Styles.wrapper} ${isTheatre && Styles.theatre} ${
        isMobile && Styles.mobile
      }`}
    >
      <Head>
        <title>{`${data.data.data.title} / ${data.data.data.series?.title} - ${SiteName}`}</title>
      </Head>
      <div className={Styles.container}>
        <div className={Styles.playerWrapper}>
          <Player data={data.data.data} />
        </div>
        <MovieInfo className={Styles.metadata} data={data.data.data} />
        <div className={Styles.playlistWrapper}>
          <PlayList
            className={Styles.playlist}
            data={data.data.data}
            maxHeight={playlistMaxHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
