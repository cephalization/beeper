import type { AuthSession } from "shared-types";
import type { Track, TrackFeatures } from "shared-types/spotify/track";
import { API_HOST } from "~/config";

const TRACK_API = `${API_HOST}/track`;

export const getTrack = async (
  trackId: string,
  accessToken?: AuthSession["access_token"]
) => {
  try {
    const response = await fetch(`${TRACK_API}/${trackId}`, {
      headers: { ...(accessToken ? { Authorization: accessToken } : {}) },
    });
    const json = await response.json();

    return json as Track;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};

export const getTrackFeatures = async (
  trackId: string,
  accessToken?: AuthSession["access_token"]
) => {
  try {
    const response = await fetch(`${TRACK_API}/${trackId}/features`, {
      headers: { ...(accessToken ? { Authorization: accessToken } : {}) },
    });
    const json = await response.json();

    return json as TrackFeatures;
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};
