import { Router } from "express";
import got from "got";
import querystring from "query-string";
import { Profile, TopArtists, TopTracks } from "shared-types/spotify/profile";

import { RouterDef } from ".";
import { formatBearerAuth } from "../util";

const baseRoute = "/me";

const router = Router();

router.get("/", async (req, res) => {
  const qs = querystring.extract(req.url);
  const authHeader = req.headers.authorization;

  const Authorization = await formatBearerAuth(authHeader);

  if (!Authorization) {
    return res
      .status(401)
      .json({ error: "Authorization header not provided." });
  }

  if (!qs || qs === "q=") {
    return res.status(204).send();
  }

  try {
    const meResponse = await got
      .get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      })
      .json<Profile>();

    return res.json(meResponse);
  } catch (e) {
    console.error(e);
    return res.status(401).send();
  }
});

router.get("/top/:type", async (req, res) => {
  const { type } = req.params;
  const qs = querystring.extract(req.url);
  const authHeader = req.headers.authorization;

  const Authorization = await formatBearerAuth(authHeader);

  if (!Authorization) {
    return res
      .status(401)
      .json({ error: "Authorization header not provided." });
  }

  if (!type || (type !== "artists" && type !== "tracks")) {
    return res.status(400).json({
      error: "/top/<type> must be 'tracks' or 'artists'",
    });
  }

  try {
    const topResponse = await got
      .get(`https://api.spotify.com/v1/me/top/${type}${qs ? `?${qs}` : ""}`, {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      })
      .json<TopTracks | TopArtists>();

    return res.json(topResponse);
  } catch (e) {
    console.error(e);
    return res.status(401).send();
  }
});

export const meRouter: RouterDef = [baseRoute, router];
