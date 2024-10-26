export type v4GetMovieRes =
  | {
      status: "ok";
      code: 200;
      data: FilteredMovie & { isOwner: boolean };
    }
  | v4ErrorRes;

export type v4GetSeriesRes =
  | {
      status: "ok";
      code: 200;
      data: FilteredSeries;
    }
  | v4ErrorRes;

export type v4GetUserRes =
  | {
      status: "ok";
      code: 200;
      data: FilteredUser;
    }
  | v4ErrorRes;

export type v4PostAuthLoginRes =
  | {
      status: "ok";
      code: 200;
      data: string;
    }
  | v4ErrorRes;

export type v4PostUsersRes =
  | {
      status: "ok";
      code: 200;
      data: {
        user: FilteredUser;
        token: string;
      };
    }
  | v4ErrorRes;

export type v4DeleteAuthLogoutRes =
  | {
      status: "ok";
      code: 200;
      data: null;
    }
  | v4ErrorRes;

export type v4ErrorRes = {
  status: "error";
  code: 400 | 401 | 403 | 404;
  message: string;
};

export type FilteredUser = {
  name: string;
  username: string;
};

export type FilteredSeries = {
  id: string;
  title: string;
  description?: string | null;
  author: FilteredUser;
  movies?: FilteredMovie[];
};

export type FilteredMovie = {
  id: string;
  title: string;
  description?: string | null;
  duration: number;
  contentUrl: string;
  thumbnailUrl?: string | null;
  author: FilteredUser;
  series?: FilteredSeries | null;
  createdAt: string;
};
