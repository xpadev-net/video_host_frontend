export type Movie = {
  id: number;
  seriesUrl: string;
  url: string;
  title: string;
  episodeTitle: string;
  duration: number;
  addAt: number;
}

export type MovieProps = {
  movie: Movie;
  type: "row"|"column"|"minColumn";
  index?: number|"active";
  itemWidth?: number;
}

export type WrapperProps = {
  itemWidth?: number;
}