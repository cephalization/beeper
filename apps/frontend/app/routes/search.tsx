import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "react-router";
import { authentication, parseCookie } from "~/cookies";

export const loader = async ({ request }: LoaderArgs) => {
  const authCookie = await parseCookie(authentication, request);

  if (!authCookie) {
    return redirect("/");
  }

  return json({ authCookie });
};

const Search = () => {
  const data = useLoaderData<typeof loader>();
  return <div>Search Page: {JSON.stringify(data.authCookie, null, 2)}</div>;
};

export default Search;
