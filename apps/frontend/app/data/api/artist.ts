import type { AuthSession, SpotifyArtistTopTracksResponse } from "shared-types";
import type { Artist } from "shared-types/spotify/artist";
import { API_HOST } from "~/config";

const ARTIST_API = `${API_HOST}/artist`;

export const getArtist = async (
  artistId: string,
  accessToken?: AuthSession["access_token"]
) => {
  try {
    const response = await fetch(`${ARTIST_API}/${artistId}`, {
      headers: { ...(accessToken ? { Authorization: accessToken } : {}) },
    });
    const json = await response.json();

    return json as Artist;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};

export const getArtistTopTracks = async (
  artistId: string,
  accessToken?: AuthSession["access_token"]
) => {
  try {
    const response = await fetch(`${ARTIST_API}/${artistId}/top`, {
      headers: { ...(accessToken ? { Authorization: accessToken } : {}) },
    });
    const json = await response.json();

    return json as SpotifyArtistTopTracksResponse;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};
