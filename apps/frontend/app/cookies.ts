import { type Cookie, createCookie } from "@remix-run/node";
import type { AuthCookie } from "shared-types";

export const parseCookie = async <CookieType>(
  cookie: Cookie,
  request: Request
): Promise<CookieType | undefined> =>
  await cookie.parse(request.headers.get("Cookie"));

export const validateCookie = async <CookieType>(
  ...args: Parameters<typeof parseCookie>
): Promise<[true, CookieType] | [false, undefined]> => {
  const parsedCookie = await parseCookie<CookieType>(...args);

  if (parsedCookie) {
    return [true, parsedCookie];
  }

  return [false, undefined];
};

export const authentication = createCookie("authentication");
export const validateAuthentication = async (request: Request) =>
  await validateCookie<AuthCookie>(authentication, request);
