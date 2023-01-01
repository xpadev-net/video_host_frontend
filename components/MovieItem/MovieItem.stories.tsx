import { MovieItem } from "./MovieItem";

export default {
  title: "MovieItem",
};

export const item = () => (
  <div style={{ width: "320px", height: "240px" }}>
    <MovieItem
      alt={""}
      src={
        "https://nicovideo.cdn.nimg.jp/thumbnails/41422114/41422114.97189069.M"
      }
      watched={100}
    />
  </div>
);
