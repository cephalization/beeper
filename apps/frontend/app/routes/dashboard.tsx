import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TopArtists from "~/components/TopArtists";
import TopTracks from "~/components/TopTracks";
import {
  getTopArtists,
  getTopTracks,
  timeRangeSchema,
} from "~/data/api/profile";
import { isResponseError } from "~/data/api/types";
import { getAuthFromSession, requestSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  if (!auth) {
    return redirect("/");
  }

  const url = new URL(request.url);
  const timeRange = timeRangeSchema
    .nullish()
    .transform((v) => (!v ? "medium_term" : v))
    .parse(url.searchParams.get("time_range"));

  const topTracks = await getTopTracks(auth.access_token, timeRange);
  const topArtists = await getTopArtists(auth.access_token, timeRange);

  return json({
    auth,
    topTracks,
    topArtists,
    timeRange,
  });
};

const Dashboard = () => {
  const { topTracks, topArtists } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {!isResponseError(topTracks) && (
        <div className="mt-4 bg-slate-200 p-4 pb-0 rounded-sm">
          <h2 className="text-lg font-medium leading-6 text-gray-600">
            Top Tracks
          </h2>
          <TopTracks tracks={topTracks.items} />
        </div>
      )}
      {!isResponseError(topArtists) && (
        <div className="mt-4 bg-slate-200 p-4 pb-0 rounded-sm">
          <h2 className="text-lg font-medium leading-6 text-gray-600">
            Top Artists
          </h2>
          <TopArtists artists={topArtists.items} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
