import type { LoaderArgs, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Track } from "shared-types/spotify/track";
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
      {error && (
        <div className="mt-4">
          <h2 className="text-lg text-slate-500">
            An error occurred loading search results, please try again.
          </h2>
          <p>{error && error.message}</p>
        </div>
      )}
      <SearchResults
        results={
          results || {
            tracks: {
              items: [] as SerializeFrom<Track[]>,
              href: "",
              limit: 0,
              next: "",
              previous: "",
              total: 0,
              offset: 0,
            },
          }
        }
      />
    </div>
  );
};

export default Search;
