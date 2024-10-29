type authenticationError = {
  status: "fail";
  code: "401";
  message: "authentication required";
};

type CommentRes = {
  status: "success";
  code: "200";
  data: {
    comments: v1Comment[];
  };
};

export type CommentResponse = CommentRes | authenticationError;

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
