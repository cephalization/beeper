import { Router } from "express";
import got from "got";
import { DateTime } from "luxon";
import querystring from "query-string";
import { SpotifyAuthorizationResponse } from "shared-types";
import { v4 as uuid } from "uuid";

import { RouterDef } from ".";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../config";

const baseRoute = "/login";

const router = Router();

const loginScopes = `user-read-private user-read-email playlist-read-private user-library-read user-top-read user-read-recently-played`;

router.get("/", (req, res) => {
  const state = uuid();
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: loginScopes,
      redirect_uri: REDIRECT_URI,
      state,
    })}`
  );
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!state || !code) {
    return res.redirect(
      `/?${querystring.stringify({
        error: "state_mismatch",
      })}`
    );
  }

  const authBuffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  try {
    const authResponse = await got
      .post("https://accounts.spotify.com/api/token", {
        form: {
          code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization: `Basic ${authBuffer}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .json<Omit<SpotifyAuthorizationResponse, "expires">>();

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("scope");

    const expires = DateTime.now()
      .plus({ seconds: authResponse.expires_in })
      .toJSDate();

    res.cookie("access_token", authResponse.access_token, {
      expires,
    });
    res.cookie("refresh_token", authResponse.refresh_token, { expires });
    res.cookie("scope", authResponse.scope, { expires });

    return res.json({ ...authResponse, expires });
  } catch (e) {
    console.error(e);
    return res.json({ error: e });
  }
});

export const loginRouter: RouterDef = [baseRoute, router];
