import Head from "next/head";
import { CSSProperties, useRef, useState } from "react";

import { MovieCard } from "@/components/Movie";
import { SiteName } from "@/contexts/env";
import { useMovies } from "@/hooks/useMovies";
import { useIsomorphicEffect } from "@/libraries/IsomorphicEffect";
import Styles from "@/styles/index.module.scss";

const Index = () => {
  const { data } = useMovies();

  const [width, setWidth] = useState(360);
  const wrapper = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver>();
  const isomorphicEffect = useIsomorphicEffect();
  const handleResize = () => {
    const width = wrapper.current?.clientWidth || 1920;
    const cardCount = Math.floor(width / 380) + 1;
    setWidth(width / cardCount - 20);
  };
  isomorphicEffect(() => {
    if (!observer.current) observer.current = new ResizeObserver(handleResize);
    if (!wrapper.current) return;
    handleResize();
    observer.current?.observe(wrapper.current);
  }, [wrapper.current]);

  if (!data || data.status !== "ok") {
    return <></>;
  }

  return (
    <div className={Styles.wrapper}>
      <Head>
        <title>{SiteName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        ref={wrapper}
        style={{ "--width": `${width}px` } as CSSProperties}
        className={Styles.container}
      >
        {data.data.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              type={"row"}
              showSeries={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Index;
