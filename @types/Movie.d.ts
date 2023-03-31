export type Movie = {
  id: number;
  seriesUrl: string;
  url: string;
  seriesTitle: string;
  title: string;
  duration: number;
  addAt: number;
}

export type WrapperProps = {
  itemWidth?: number;
}