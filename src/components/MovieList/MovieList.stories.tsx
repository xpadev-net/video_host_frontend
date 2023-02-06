import { MovieList } from "./MovieList";

export default {
  title: "MovieList",
};

const data = [
  {
    src: "https://nicovideo.cdn.nimg.jp/thumbnails/41422114/41422114.97189069.M?1",
    watched: 100,
    alt: "",
  },
  {
    src: "https://nicovideo.cdn.nimg.jp/thumbnails/41422114/41422114.97189069.M?2",
    watched: 100,
    alt: "",
  },
  {
    src: "https://nicovideo.cdn.nimg.jp/thumbnails/41422114/41422114.97189069.M?3",
    watched: 100,
    alt: "",
  },
  {
    src: "https://nicovideo.cdn.nimg.jp/thumbnails/41422114/41422114.97189069.M?4",
    watched: 100,
    alt: "",
  },
  {
    src: "https://nicovideo.cdn.nimg.jp/thumbnails/41422114/41422114.97189069.M?5",
    watched: 100,
    alt: "",
  },
];
export const row = () => {
  return (
    <div style={{ width: "1600px", height: "240px" }}>
      <MovieList movies={data} direction={"row"} />
    </div>
  );
};
export const column = () => {
  return (
    <div style={{ width: "320px", height: "1200px" }}>
      <MovieList movies={data} direction={"column"} />
    </div>
  );
};
