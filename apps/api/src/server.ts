import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { getClient } from "./services/redis";
import { spotifyAuth } from "./middleware/spotifyAuth";

export const createServer = async () => {
  const app = express();

  const client = getClient();
  await client.connect();

  app
    .disable("x-powered-by")
    .use(cookieParser())
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(spotifyAuth)
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  routes.forEach(([routeName, router]) => {
    app.use(routeName, router);
  });

  return app;
};
