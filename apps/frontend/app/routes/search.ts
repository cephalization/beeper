import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSearch } from "~/data/api/search";
import { requestSession, getAuthFromSession } from "~/sessions";

export const loader = async ({ request, params }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  const qs = new URL(request.url).searchParams.get("search") ?? "";
  const response = await getSearch(qs, auth?.access_token);

  console.log(response);

  return redirect("/");
};
