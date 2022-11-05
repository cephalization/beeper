import { BasicAuthentication } from "./config";

// This is wrong, you will never fallback to Basic auth for a request
// you use Basic to get Bearer for a user or Basic to get Bearer for the server
// then make all requests with Bearer auth
export const getAnyAuthorizationHeader = (accessToken?: string) =>
  accessToken ? `Bearer ${accessToken}` : BasicAuthentication;
