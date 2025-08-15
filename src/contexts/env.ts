export const ApiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? "";
export const SiteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";
export const EnableComments =
  process.env.NEXT_PUBLIC_ENABLE_COMMENTS === "true";
export const RequireSignupCode =
  process.env.NEXT_PUBLIC_REQUIRE_SIGNUP_CODE === "true";
