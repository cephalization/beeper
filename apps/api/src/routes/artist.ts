import { Router } from "express";
import got from "got";
import { SpotifyArtistTopTracksResponse } from "shared-types";
import { Artist } from "shared-types/spotify/artist";
import { Track } from "shared-types/spotify/track";

import { RouterDef } from ".";
import { getAnyBearerAuth } from "../util";

const baseRoute = "/artist";

const router = Router();

router.get("/:artistId", async (req, res) => {
  const { artistId } = req.params;
  const authHeader = req.headers.authorization;

  const Authorization = await getAnyBearerAuth(authHeader);

  if (!Authorization) {
    return res
      .status(402)
      .json({ error: "Could not authenticate with Spotify." });
  }

  if (!artistId) {
    return res.status(204).send();
  }

  try {
    const artistResponse = await got
      .get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      })
      .json<Artist>();

    return res.json(artistResponse);
  } catch (e) {
    return res.status(401).send();
  }
});

router.get("/:artistId/top", async (req, res) => {
  const { artistId } = req.params;
  const authHeader = req.headers.authorization;

  const Authorization = await getAnyBearerAuth(authHeader);

  if (!Authorization) {
    return res
      .status(402)
      .json({ error: "Could not authenticate with Spotify." });
  }

  if (!artistId) {
    return res.status(204).send();
  }

  try {
    const artistResponse = await got
      .get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: {
            Authorization,
            "Content-Type": "application/json",
          },
        }
      )
      .json<SpotifyArtistTopTracksResponse>();

    return res.json(artistResponse);
  } catch (e) {
    console.error(e.response.body);
    return res.status(401).send();
  }
});

export const artistRouter: RouterDef = [baseRoute, router];
