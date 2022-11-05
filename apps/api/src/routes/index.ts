import type { Router } from "express";
import { loginRouter } from "./login";
import { searchRouter } from "./search";
import { trackRouter } from "./track";

export type RouterDef = [string, Router];

export const routes: RouterDef[] = [loginRouter, searchRouter, trackRouter];
