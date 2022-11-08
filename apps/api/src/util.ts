import { getClientSpotifyAuthentication } from "./middleware/spotifyAuth";

export const formatBearerAuth = (accessToken?: string) => {
  if (!accessToken) return null;

  return `Bearer ${accessToken}`;
};

/**
 * Use the given Bearer auth from spotify or fallback to the server's auth
 *
 * NOTE should only be used on un-scoped routes like search
 *
 * @param accessToken a Bearer access token from spotify
 *
 * @returns {string}
 */
export const getAnyBearerAuth = async (accessToken?: string) => {
  const auth = accessToken
    ? accessToken
    : await getClientSpotifyAuthentication();

  if (!auth) {
    return null;
  }

  return formatBearerAuth(auth);
};
