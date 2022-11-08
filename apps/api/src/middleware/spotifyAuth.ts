import type { NextFunction, Request, RequestHandler, Response } from "express";
import got from "got/dist/source";
import { BasicAuthentication } from "../config";
import { getClient } from "../services/redis";
import { WatchError } from "redis";

const SPOTIFY_AUTH_KEY = "server_auth_spotify";
const client = getClient();

function restrictFunctionCalls<
  T extends (...args: Parameters<T>) => Promise<unknown>
>(fn: T, maxCalls: number) {
  let count = 0;
  return async function (...args: Parameters<T>) {
    console.log({ count });
    if (count++ < maxCalls) {
      const out = await fn(...args);
      count--;
      return out;
    }

    count--;

    return false;
  };
}

const askForAuth = restrictFunctionCalls(async () => {
  try {
    await client.executeIsolated(async (isolatedClient) => {
      await isolatedClient.watch(SPOTIFY_AUTH_KEY);
      console.log("client_credentials transaction STARTED");
      const authenticationResponse = await got
        .post("https://accounts.spotify.com/api/token", {
          form: {
            grant_type: "client_credentials",
          },
          headers: {
            Authorization: BasicAuthentication,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .json<{
          access_token: string;
          expires_in: number;
          token_type: "bearer";
        }>();
      console.log("Server obtained client_credentials from spotify");
      await isolatedClient
        .multi()
        .set(SPOTIFY_AUTH_KEY, authenticationResponse.access_token, {
          EX: authenticationResponse.expires_in,
        })
        .exec();
      console.log("client_credentials transaction SUCCEEDED!");
    });
  } catch (e) {
    if (e instanceof WatchError) {
      return console.log("client_credentials transaction ABORTED");
    }

    console.error("Server could not authenticate with spotify", e);
  }
}, 1);

export const spotifyAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // don't bother checking server auth, we'll try the user's
  if (req.headers.authorization) {
    return next();
  }

  const serverAuth = await client.get(SPOTIFY_AUTH_KEY);

  if (!serverAuth) {
    console.log("Server credentials for spotify are EXPIRED");
    await askForAuth();
  }

  console.log("Server has authentication with Spotify");

  next();
};

export const getClientSpotifyAuthentication = async () => {
  return await client.get(SPOTIFY_AUTH_KEY);
};
