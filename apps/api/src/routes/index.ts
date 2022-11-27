import type { Router } from "express";
import { artistRouter } from "./artist";
import { loginRouter } from "./login";
import { meRouter } from "./me";
import { searchRouter } from "./search";
import { trackRouter } from "./track";

export type RouterDef = [string, Router];

export const routes: RouterDef[] = [
  loginRouter,
  searchRouter,
  trackRouter,
  meRouter,
  artistRouter,
];
