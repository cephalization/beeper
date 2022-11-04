import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import SearchResults from "~/components/SearchResults";
import { getSearch } from "~/data/api/search";
import { requestSession, getAuthFromSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  const qs = new URL(request.url).searchParams.get("search") ?? "";
  const response = await getSearch(qs, auth?.access_token);

  if ("ok" in response && !response.ok) {
    return json({
      ok: false,
      error: response.error,
      results: null,
      query: qs,
    });
  }

  invariant(!("ok" in response));

  return json({
    query: qs,
    results: response,
    error: null,
    ok: true,
  });
};

const Search = () => {
  const { query, results, ok } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Search Results: "{query}"</h1>
      {results !== null ? (
        <div className="overflow-x-scroll mt-4 bg-gray-400 text-slate-100 p-4 rounded-sm">
          <SearchResults results={results} />
        </div>
      ) : (
        <div>An error occurred loading search results!</div>
      )}
    </div>
  );
};

export default Search;
