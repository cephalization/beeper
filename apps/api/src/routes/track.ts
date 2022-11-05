import { Router } from "express";
import got from "got";
import querystring from "query-string";
import { Track, TrackFeatures } from "shared-types/spotify/track";

import { RouterDef } from ".";
import { getAnyAuthorizationHeader } from "../util";

const baseRoute = "/track";

const router = Router();

router.get("/:trackId", async (req, res) => {
  const { trackId } = req.params;
  const authHeader = req.headers.authorization;

  const Authorization = getAnyAuthorizationHeader(authHeader);

  console.log({ trackId, Authorization, authHeader });

  if (!trackId) {
    return res.status(204).send();
  }

  try {
    const trackResponse = await got
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      })
      .json<Track>();

    return res.json(trackResponse);
  } catch (e) {
    return res.status(401).send();
  }
});

router.get("/:trackId/features", async (req, res) => {
  const { trackId } = req.params;
  const authHeader = req.headers.authorization;

  const Authorization = getAnyAuthorizationHeader(authHeader);

  console.log({ trackId, Authorization, authHeader });

  if (!trackId) {
    return res.status(204).send();
  }

  try {
    const featuresResponse = await got
      .get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      })
      .json<TrackFeatures>();

    return res.json(featuresResponse);
  } catch (e) {
    return res.status(401).send();
  }
});

export const trackRouter: RouterDef = [baseRoute, router];
