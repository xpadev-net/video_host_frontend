import { useRouter } from "next/router";
import { MovieRes, MovieResponse } from "@/@types/api";
import { request } from "@/libraries/request";
import Styles from "@/styles/movie.module.scss";
import { PlayList } from "@/components/PlayList/PlayList";
import { Player } from "@/components/Player/Player";
import { useAtomValue, useSetAtom } from "jotai";
import {
  PlayerConfigAtom,
  VideoMetadataAtom,
  WrapperRefAtom,
} from "@/atoms/Player";
import { MovieInfo } from "@/components/MovieInfo/MovieInfo";
import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/libraries/isMobile";

const MoviePage = () => {
  const router = useRouter();
  const query = router.query.movie;
  const { isTheatre } = useAtomValue(PlayerConfigAtom);
  const setVideoMetadata = useSetAtom(VideoMetadataAtom);
  const wrapperRef = useAtomValue(WrapperRefAtom);
  const [playlistMaxHeight, setPlaylistMaxHeight] = useState<
    number | undefined
  >();
  const [result, setResult] = useState<MovieRes | undefined>();
  const isMobile = useIsMobile();
  const isWideVideo = isTheatre || isMobile;
  useEffect(() => {
    if (typeof query !== "string") return;
    void (async () => {
      setVideoMetadata((prev) => ({ ...prev, isLoading: true }));
      const result: MovieResponse = await request(
        `/movie/${encodeURIComponent(query)}`
      );
      if (result.status !== "success") {
        void router.push(
          `/login?callback=${encodeURIComponent(router.asPath)}`
        );
        return <></>;
      }
      setResult(result);
    })();
  }, [query]);
  const movieInfo = useMemo(() => {
    if (!result || result.status !== "success") return <></>;
    return <MovieInfo className={Styles.info} data={result?.data} />;
  }, [result]);
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
  if (!result) return <></>;

  return (
    <div className={`${Styles.wrapper} ${isWideVideo && Styles.theatre}`}>
      <div className={Styles.mainWrapper}>
        <div className={Styles.playerWrapper}>
          <Player data={result.data} />
        </div>
        {!isWideVideo && movieInfo}
      </div>
      <div className={Styles.subWrapper}>
        {isWideVideo && movieInfo}
        <div className={Styles.playlistWrapper}>
          <PlayList data={result.data} maxHeight={playlistMaxHeight} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
