import { type Response, Router } from "express";
import got from "got";
import { DateTime } from "luxon";
import querystring from "query-string";
import {
  AuthorizationCallbackResponse,
  SpotifyAuthorizationResponse,
  SpotifyProfileResponse,
} from "shared-types";
import { v4 as uuid } from "uuid";

import { RouterDef } from ".";
import {
  BasicAuthentication,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
} from "../config";

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

router.get(
  "/callback",
  async (
    req,
    res: Response<AuthorizationCallbackResponse | { error: string }>
  ) => {
    const { code, state } = req.query;

    if (!state || !code) {
      return res.redirect(
        `/?${querystring.stringify({
          error: "state_mismatch",
        })}`
      );
    }

    try {
      const authenticationResponse = await got
        .post("https://accounts.spotify.com/api/token", {
          form: {
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
          },
          headers: {
            Authorization: BasicAuthentication,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .json<Omit<SpotifyAuthorizationResponse, "expires">>();

      const expires = DateTime.now()
        .plus({ seconds: authenticationResponse.expires_in })
        .toJSDate();

      const userResponse = await got
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${authenticationResponse.access_token}`,
            "Content-Type": "application/json",
          },
        })
        .json<SpotifyProfileResponse>();

      return res.json({
        ...authenticationResponse,
        profile: userResponse,
        expires,
      });
    } catch (e) {
      console.error(e);
      return res.json({ error: e as string });
    }
  }
);

export const loginRouter: RouterDef = [baseRoute, router];
