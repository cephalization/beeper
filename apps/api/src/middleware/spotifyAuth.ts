import type { NextFunction, Request, RequestHandler, Response } from "express";
import { getClient } from "../services/redis";

const SPOTIFY_AUTH_KEY = "server_auth_spotify";
const client = getClient();

export const spotifyAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serverAuth = await client.get(SPOTIFY_AUTH_KEY);

  if (!serverAuth) {
    console.log("Server is not authenticated with spotify");
  }

  next();
};
