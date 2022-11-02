import { redirect, type LoaderArgs } from "@remix-run/node";
import { getLoginCallback } from "~/data/api/login";
import type { AuthCookie, AuthorizationCallbackResponse } from "shared-types";
import { authentication } from "~/cookies";

export const loader = async ({ request }: LoaderArgs) => {
  const query = request.url.split("?")[1] || "";

  const response = await getLoginCallback(query);
  const data = (await response.json()) as
    | AuthorizationCallbackResponse
    | { error: string };

  if (!data || "error" in data) {
    return redirect("/?error=auth_error");
  }

  const authCookie: AuthCookie = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    name: data.profile.display_name,
    image_url: data.profile.images?.[0]?.url,
  };

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await authentication.serialize(authCookie, {
        expires: new Date(data.expires),
      }),
    },
  });
};
