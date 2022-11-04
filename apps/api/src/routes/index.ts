import type { Router } from "express";
import { loginRouter } from "./login";
import { searchRouter } from "./search";

export type RouterDef = [string, Router];

export const routes: RouterDef[] = [loginRouter, searchRouter];
