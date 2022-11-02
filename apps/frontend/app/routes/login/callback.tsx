import { redirect, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLoginCallback } from "~/data/login";
import type { SpotifyAuthorizationResponse } from "shared-types";
import { authentication, parseCookie } from "~/cookies";

export const loader = async ({ request }: LoaderArgs) => {
  const query = request.url.split("?")[1] || "";

  const response = await getLoginCallback(query);
  const data = (await response.json()) as SpotifyAuthorizationResponse;

  if (data) {
    const authCookie = (await parseCookie(authentication, request)) || {};
    authCookie.access_token = data.access_token;
    authCookie.refresh_token = data.refresh_token;
    return redirect("/search", {
      headers: {
        "Set-Cookie": await authentication.serialize(authCookie, {
          expires: new Date(data.expires),
        }),
      },
    });
  }

  return redirect("/?error=auth_error");
};

const Callback = () => {
  const data = useLoaderData<typeof loader>();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Callback;
