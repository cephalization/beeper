import { Router } from "express";
import got from "got";
import querystring from "query-string";

import { RouterDef } from ".";
import { getAnyBearerAuth } from "../util";

const baseRoute = "/search";

const router = Router();

router.get("/", async (req, res) => {
  const qs = querystring.extract(req.url);
  const authHeader = req.headers.authorization;

  const Authorization = await getAnyBearerAuth(authHeader);

  if (!Authorization) {
    return res
      .status(401)
      .json({ error: "Could not authenticate with Spotify." });
  }

  if (!qs || qs === "q=") {
    return res.status(204).send();
  }

  try {
    const searchResponse = await got
      .get(`https://api.spotify.com/v1/search?${qs}&type=track`, {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      })
      .json();

    return res.json(searchResponse);
  } catch (e) {
    console.error(e);
    return res.status(401).send();
  }
});

export const searchRouter: RouterDef = [baseRoute, router];
