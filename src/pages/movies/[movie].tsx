import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { PlayerConfigAtom, WrapperRefAtom } from "@/atoms/Player";
import { MovieInfo } from "@/components/MovieInfo";
import { MoviePageSkeleton } from "@/components/MoviePageSkeleton";
import { Player } from "@/components/Player";
import { PlayList } from "@/components/PlayList";
import { SiteName } from "@/contexts/env";
import { useMovie } from "@/hooks/useMovie";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/libraries/isMobile";
import { query2str } from "@/utils/query2str";

const MoviePage = () => {
  const router = useRouter();
  const query = router.query.movie;
  const data = useMovie(query2str(query));

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
  if (!data.data) return <MoviePageSkeleton />;
  if (data.data.status !== "ok") {
    return (
      <div>
        <h2>見つかりませんでした</h2>
      </div>
    );
  }
  return (
    <div className={"p-6 max-w-[1800px] mx-auto"}>
      <Head>
        <title>{`${data.data.data.title} / ${data.data.data.series?.title} - ${SiteName}`}</title>
      </Head>
      <div
        className={cn(
          "grid grid-cols-[1fr_minmax(300px,400px)] gap-6 max-[1000px]:grid-cols-1",
          isMobile &&
            "landscape:grid-cols-[1fr_minmax(200px,300px)] landscape:gap-0",
        )}
      >
        <div
          className={cn(
            "player-wrapper min-w-[640px] max-[1000px]:min-w-0",
            isTheatre &&
              "col-span-2 -mx-6 pb-3 w-[100vw] relative left-[calc(max((100vw-1800px),0px)/-2)]",
            isMobile && "max-[1000px]:-mx-6 max-[1000px]:pb-3",
            isMobile && "landscape:m-0 landscape:p-0 landscape:min-w-[500px]",
          )}
        >
          <Player data={data.data.data} />
        </div>
        <MovieInfo
          className={cn(
            "metadata",
            isTheatre && "min-w-[640px]",
            isMobile && "landscape:p-6",
          )}
          data={data.data.data}
        />
        <div
          className={cn(
            "playlist-wrapper",
            isTheatre
              ? "col-start-2 row-start-2 row-span-1"
              : "col-start-2 row-start-1 row-span-2",
            "max-[1000px]:col-auto max-[1000px]:row-auto",
          )}
        >
          <PlayList
            className={cn(
              "playlist max-[1000px]:!max-h-none",
              isMobile && "landscape:max-h-[calc(100dvh-104px)]",
            )}
            data={data.data.data}
            maxHeight={playlistMaxHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
