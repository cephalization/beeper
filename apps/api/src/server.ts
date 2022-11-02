import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(cookieParser())
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    })
    .get("/delayedhealth", async (req, res) => {
      const requestStart = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return res.json({
        ok: true,
        duration: `${(Date.now() - requestStart) / 1000}s`,
      });
    });

  routes.forEach(([routeName, router]) => {
    app.use(routeName, router);
  });

  return app;
};
