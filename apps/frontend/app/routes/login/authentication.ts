import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  destroySessionHeader,
  getAuthFromSession,
  requestSession,
} from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  return json({
    authenticated: !!auth,
    authentication: auth,
  });
};

export const action = async ({ request }: ActionArgs) => {
  const method = new URL(request.url).searchParams.get("method");
  const session = await requestSession(request);

  // If JS is disabled, the request method will always be POST
  // we'll check for request method and 'method' querystring
  if (request.method.toLowerCase() === "delete" || method === "delete") {
    return redirect("/", {
      headers: {
        ...(await destroySessionHeader(session)),
      },
    });
  }

  return redirect("/");
};
