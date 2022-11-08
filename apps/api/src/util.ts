import { getClientSpotifyAuthentication } from "./middleware/spotifyAuth";

/**
 * Use the given Bearer auth from spotify or fallback to the server's auth
 *
 * NOTE should only be used on un-scoped routes like search
 *
 * @param accessToken a Bearer access token from spotify
 *
 * @returns {string}
 */
export const getAnyAuthorizationHeader = async (accessToken?: string) => {
  const auth = accessToken
    ? accessToken
    : await getClientSpotifyAuthentication();

  if (!auth) {
    return null;
  }

  return `Bearer ${auth}`;
};
