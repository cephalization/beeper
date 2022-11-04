import type { AuthSession, SpotifyTrackSearchResponse } from "shared-types";
import { API_HOST } from "~/config";

const SEARCH_API = `${API_HOST}/search`;

export const getSearch = async (
  query: string,
  accessToken?: AuthSession["access_token"]
) => {
  try {
    const response = await fetch(`${SEARCH_API}?q=${query}`, {
      headers: { ...(accessToken ? { Authorization: accessToken } : {}) },
    });
    const json = await response.json();

    return json as SpotifyTrackSearchResponse;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};
