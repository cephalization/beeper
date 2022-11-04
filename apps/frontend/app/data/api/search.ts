import type { AuthSession } from "shared-types";
import { API_HOST } from "~/config";

const SEARCH_API = `${API_HOST}/search`;

export const getSearch = async (
  query: string,
  accessToken?: AuthSession["access_token"]
): Promise<{}> => {
  try {
    return (await (
      await fetch(`${SEARCH_API}?q=${query}`, {
        headers: { ...(accessToken ? { Authorization: accessToken } : {}) },
      })
    ).json()) as {};
  } catch (e) {
    // remix non-deferred loader data will blow up the server if an error is thrown
    return {
      ok: false,
      error: new Error("Could not connect to api"),
    };
  }
};
