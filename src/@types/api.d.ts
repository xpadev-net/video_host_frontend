import {Movie} from "@/@types/Movie";

export type recentUpdates = {
  seriesUrl: string;
  title: string;
  movies: Movie[];
}[];

type recentUpdatesRes = {
  status: "success";
  code: "200";
  data: recentUpdates;
}

type authenticationError = {
  status: "fail";
  code: "401";
  message: "authentication required";
}

export type recentUpdatesResponse = recentUpdatesRes | authenticationError;

type authorized = {
  status: "success";
  code: "200";
}

type nonAuthorized = {
  status: "fail";
  code: "401";
  message: "invalid token";
}

export type tryAuthResponse = authorized | nonAuthorized;

type authSuccess = {
  status: "success";
  code: "200";
}

type authFail = {
  status: "fail";
  code: "401";
  message: "incorrect username or password"
}

export type authResponse = authSuccess | authFail;