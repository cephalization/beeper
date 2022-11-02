import type { CookieOptions } from "@remix-run/node";
import { type Cookie, createCookie } from "@remix-run/node";

export const parseCookie = (cookie: Cookie, request: Request) =>
  cookie.parse(request.headers.get("Cookie"));

export const authentication = createCookie("authentication");
