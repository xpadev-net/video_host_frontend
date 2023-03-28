export type Movie = {
  id: number;
  seriesUrl: string;
  url: string;
  seriesTitle: string;
  title: string;
  duration: number;
  addAt: number;
}

export type MovieProps = {
  movie: Movie;
  type: "row"|"column"|"minColumn";
  index?: number|"active";
}

export type WrapperProps = {
  itemWidth?: number;
}