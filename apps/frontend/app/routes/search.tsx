import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SearchResults from "~/components/SearchResults";
import { getSearch } from "~/data/api/search";
import { requestSession, getAuthFromSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  const qs = new URL(request.url).searchParams.get("search") ?? "";
  const response = await getSearch(qs, auth?.access_token);

  return json({
    query: qs,
    results: "ok" in response ? null : response,
    error: "error" in response ? response.error : null,
  });
};

const Search = () => {
  const { query, results, error } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Search Results: "{query}"</h1>
      {results !== null ? (
        <div className="mt-4 rounded-sm">
          <SearchResults results={results} />
        </div>
      ) : (
        <div>
          <h2>An error occurred loading search results!</h2>
          <p>{error && error.message}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
