// app/sessions.js
import type { Session } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import type { AuthSession } from "shared-types";
import { z } from "zod";
import { COOKIE_SECRET, NODE_ENV } from "./config";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      // domain: "remix.run",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      maxAge: 3600,
      secrets: [COOKIE_SECRET],
      secure: NODE_ENV === "production",
    },
  });

const authSessionSchema = z.object({
  access_token: z.string(),
  name: z.string(),
  refresh_token: z.string(),
  image_url: z.string().optional(),
});

export const requestSession = async (request: Request) =>
  await getSession(request.headers.get("Cookie"));

export const getAuthFromSession = (session: Session) => {
  const auth = Object.keys(authSessionSchema.shape).reduce<
    Partial<AuthSession>
  >((acc, curr) => {
    if (session.has(curr)) {
      return { ...acc, [curr]: session.get(curr) };
    }
    return acc;
  }, {});

  const parsed = authSessionSchema.safeParse(auth);

  if (!parsed.success) {
    return null;
  }

  return parsed.data as AuthSession;
};

export const setAuthInSession = (session: Session, auth: AuthSession) => {
  const parsed = authSessionSchema.safeParse(auth);

  if (!parsed.success) {
    return false;
  }

  Object.entries(auth).forEach(([key, value]) => session.set(key, value));

  return true;
};

const errorSessionSchema = z.string();

export const getErrorFromSession = (session: Session) => {
  const error = session.get("error");

  const parsed = errorSessionSchema.safeParse(error);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
};

export const setErrorInSession = (
  session: Session,
  error: z.infer<typeof errorSessionSchema>
) => {
  const parsed = errorSessionSchema.safeParse(error);

  if (!parsed.success) {
    return false;
  }

  session.set("error", parsed.data);

  return true;
};

export const removeErrorInSession = (session: Session) => {
  session.unset("error");
};

export const commitSessionHeader = async (session: Session) => ({
  "Set-Cookie": await commitSession(session),
});

export const destroySessionHeader = async (session: Session) => ({
  "Set-Cookie": await destroySession(session),
});
