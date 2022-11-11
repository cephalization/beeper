import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Select from "~/components/Select";
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
  const trackTimeRange = timeRangeSchema
    .nullish()
    .transform((v) => (!v ? "medium_term" : v))
    .parse(url.searchParams.get("track_time_range"));
  const artistTimeRange = timeRangeSchema
    .nullish()
    .transform((v) => (!v ? "medium_term" : v))
    .parse(url.searchParams.get("artist_time_range"));

  const topTracks = await getTopTracks(auth.access_token, trackTimeRange);
  const topArtists = await getTopArtists(auth.access_token, artistTimeRange);

  return json({
    auth,
    topTracks,
    topArtists,
    timeRange: {
      trackTimeRange,
      artistTimeRange,
    },
  });
};

const termOptions = ["long_term", "medium_term", "short_term"].map((t) => ({
  value: t,
  id: t,
  label: t
    .split("_")
    .map((tt) => `${tt[0].toUpperCase()}${tt.substring(1)}`)
    .join(" "),
}));

const Dashboard = () => {
  const { topTracks, topArtists, timeRange } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Form method="get">
        {!isResponseError(topTracks) && (
          <div className="mt-4 bg-slate-200 p-4 pb-0 rounded-sm">
            <h2 className="text-lg font-medium leading-6 text-gray-600">
              Top Tracks
            </h2>
            <Select
              options={termOptions}
              defaultValue={
                termOptions.find((t) => t.value === timeRange.trackTimeRange)
                  ?.value
              }
              name="track_time_range"
              className="mt-4"
            />
            <TopTracks tracks={topTracks.items} />
          </div>
        )}
        {!isResponseError(topArtists) && (
          <div className="mt-4 bg-slate-200 p-4 pb-0 rounded-sm">
            <h2 className="text-lg font-medium leading-6 text-gray-600">
              Top Artists
            </h2>
            <Select
              options={termOptions}
              defaultValue={
                termOptions.find((t) => t.value === timeRange.artistTimeRange)
                  ?.value
              }
              name="artist_time_range"
              className="mt-4"
            />
            <TopArtists artists={topArtists.items} />
          </div>
        )}
      </Form>
    </div>
  );
};

export default Dashboard;
