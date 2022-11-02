import type { Router } from "express";
import { loginRouter } from "./login";

export type RouterDef = [string, Router];

export const routes: RouterDef[] = [loginRouter];
