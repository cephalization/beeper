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
  const session = await requestSession(request);
  if (request.method.toLowerCase() === "delete") {
    return redirect("/", {
      headers: {
        ...(await destroySessionHeader(session)),
      },
    });
  }

  return null;
};
