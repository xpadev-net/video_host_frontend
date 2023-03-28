import {Movie} from "@/@types/Movie";
import {Series} from "@/@types/Series";

export type recentUpdates = {
  seriesUrl: string;
  title: string;
  movies: Movie[];
}[];

type recentUpdatesRes = {
  status: "success";
  data: recentUpdates;
}

type authenticationError = {
  status: "fail";
  message: "authentication required";
}

export type recentUpdatesResponse = recentUpdatesRes | authenticationError;


type SearchRes = {
  status: "success";
  movies: Movie[];
  series: Series[];
}

export type SearchResponse = SearchRes | authenticationError;

export type Suggest = { title:string }[];

type SuggestRes = {
  status: "success";
  data: Suggest;
}

export type SuggestResponse = SuggestRes | authenticationError;

type authorized = {
  status: "success";
}

type nonAuthorized = {
  status: "fail";
  message: "invalid token";
}

export type tryAuthResponse = authorized | nonAuthorized;

type authSuccess = {
  status: "success";
}

type authFail = {
  status: "fail";
  message: "incorrect username or password"
}

export type authResponse = authSuccess | authFail;