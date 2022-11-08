import type { AuthSession } from "shared-types";
import type {
  Profile,
  TopArtists,
  TopTracks,
} from "shared-types/spotify/profile";
import { z } from "zod";
import { API_HOST } from "~/config";
import { isResponseError } from "./types";

export const timeRangeSchema = z
  .enum(["long_term", "medium_term", "short_term"])
  .optional();
export type TimeRange = z.infer<typeof timeRangeSchema>;

const PROFILE_API = `${API_HOST}/me`;

export const getProfile = async (accessToken: AuthSession["access_token"]) => {
  try {
    const response = await fetch(`${PROFILE_API}`, {
      headers: { Authorization: accessToken },
    });
    const json = await response.json();

    return json as Profile;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};

export const getTopTracks = async (
  accessToken: AuthSession["access_token"],
  time_range?: TimeRange
) => {
  const response = await getTop("tracks", time_range, accessToken);

  if (isResponseError(response)) {
    return response;
  }

  return response as TopTracks;
};

export const getTopArtists = async (
  accessToken: AuthSession["access_token"],
  time_range?: TimeRange
) => {
  const response = await getTop("artists", time_range, accessToken);

  if (isResponseError(response)) {
    return response;
  }

  return response as TopArtists;
};

const getTop = async (
  type: "artists" | "tracks",
  time_range: TimeRange = "medium_term",
  accessToken: AuthSession["access_token"]
) => {
  try {
    const response = await fetch(
      `${PROFILE_API}/top/${type}?time_range=${time_range}`,
      {
        headers: { Authorization: accessToken },
      }
    );
    const json = await response.json();

    return json;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};
