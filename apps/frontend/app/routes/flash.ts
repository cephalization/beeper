import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "react-router";
import {
  commitSessionHeader,
  getErrorFromSession,
  removeErrorInSession,
  requestSession,
} from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const error = getErrorFromSession(session);

  return json({ error });
};

export const action = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const error = getErrorFromSession(session);

  if (
    request.method.toLowerCase() === "delete" ||
    request.method.toLowerCase() === "post"
  ) {
    removeErrorInSession(session);
    return redirect(request.headers.get("referer") ?? "/", {
      headers: {
        ...(await commitSessionHeader(session)),
      },
    });
  }

  return json({ error });
};
