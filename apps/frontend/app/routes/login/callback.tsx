import { redirect, type LoaderArgs } from "@remix-run/node";
import { getLoginCallback } from "~/data/api/login";
import type { AuthSession, AuthorizationCallbackResponse } from "shared-types";
import {
  commitSessionHeader,
  destroySessionHeader,
  requestSession,
  setAuthInSession,
} from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const query = request.url.split("?")[1] || "";

  const response = await getLoginCallback(query);
  const data = (await response.json()) as
    | AuthorizationCallbackResponse
    | { error: string };

  if (!data || "error" in data) {
    return redirect("/?error=auth_error", {
      headers: {
        ...(await destroySessionHeader(session)),
      },
    });
  }

  const authSession: AuthSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    name: data.profile.display_name,
    image_url: data.profile.images?.[0]?.url,
  };

  const success = setAuthInSession(session, authSession);

  if (!success) {
    return redirect("/?error=auth_error", {
      headers: {
        ...(await destroySessionHeader(session)),
      },
    });
  }

  return redirect("/dashboard", {
    headers: {
      ...(await commitSessionHeader(session)),
    },
  });
};
