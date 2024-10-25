export type v4GetMovieRes = {
  status: "success";
  data: FilteredMovie & { isOwner: boolean };
} | v4ErrorRes;

export type v4ErrorRes = {
  status: "error";
  message: string;
}

export type FilteredUser = {
  name: string;
  username: string;
};

export type FilteredSeries = {
  id: string,
  title: string,
  description?: string | null,
  author: FilteredUser,
  movies?: FilteredMovie[],
}

export type FilteredMovie = {
  id: string;
  title: string;
  description?: string | null;
  duration: number;
  contentUrl: string;
  thumbnailUrl?: string | null;
  author: FilteredUser;
  series?: FilteredSeries | null;
  createdAt: string,
};
