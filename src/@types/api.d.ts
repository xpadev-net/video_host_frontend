import { Movie } from "@/@types/Movie";
import { Series } from "@/@types/Series";

export type recentUpdates = {
  seriesUrl: string;
  seriesTitle: string;
  movies: Movie[];
}[];

type recentUpdatesRes = {
  status: "success";
  code: "200";
  data: recentUpdates;
};

type authenticationError = {
  status: "fail";
  code: "401";
  message: "authentication required";
};

type notFoundError = {
  status: "fail";
  code: "404";
  message: "not found";
};

export type recentUpdatesResponse = recentUpdatesRes | authenticationError;

type SearchRes = {
  status: "success";
  code: "200";
  data: {
    movies: Movie[];
    series: Series[];
  };
};

export type SearchResponse = SearchRes | authenticationError;

export type MovieItemSource = {
  hls: string;
  http: string;
  anonymous?: boolean;
};

export type MovieItem = {
  playlist: Movie[];
  movie: Movie;
  prev?: Movie;
  next?: Movie;
  source: MovieItemSource;
};

type MovieRes = {
  status: "success";
  code: "200";
  data: MovieItem;
};

export type MovieResponse = MovieRes | notFoundError | authenticationError;

type CommentRes = {
  status: "success";
  code: "200";
  data: {
    comments: v1Comment[];
  };
};

export type CommentResponse = CommentRes | authenticationError;

type SeriesRes = {
  status: "success";
  code: "200";
  data: {
    seriesTitle: string;
    movies: Movie[];
  };
};

export type SeriesResponse = SeriesRes | notFoundError | authenticationError;

export type Suggest = { title: string }[];

type SuggestRes = {
  status: "success";
  code: "200";
  data: Suggest;
};

export type SuggestResponse = SuggestRes | authenticationError;

type authorized = {
  status: "success";
  code: "200";
};

type nonAuthorized = {
  status: "fail";
  code: "401";
  message: "invalid token";
};

export type tryAuthResponse = authorized | nonAuthorized;

type authSuccess = {
  status: "success";
  code: "200";
};

type authFail = {
  status: "fail";
  code: "401";
  message: "incorrect username or password";
};

export type authResponse = authSuccess | authFail;
