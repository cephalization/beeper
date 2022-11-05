import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTrack, getTrackFeatures } from "~/data/api/track";
import { getAuthFromSession, requestSession } from "~/sessions";
import { readableFeatures } from "~/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  if (!auth || !params.trackId) {
    return redirect("/");
  }

  try {
    const track = await getTrack(params.trackId, auth.access_token);
    const features = await getTrackFeatures(params.trackId, auth.access_token);

    if ("ok" in track) {
      throw new Error("Track could not be loaded");
    }

    return json({
      track,
      features,
    });
  } catch (e) {
    return redirect("/?error=request_error");
  }
};

const TrackId = () => {
  const { track, features } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <div className="flex w-full justify-between flex-wrap sm:flex-nowrap">
        <div className="flex">
          <img
            className="mr-5 h-16 w-auto"
            src={track.album?.images?.[0]?.url}
            alt={`Album - ${track.album.name}`}
          ></img>
          <div className="flex flex-wrap">
            <h1 className="text-2xl font-bold w-full">{track.name}</h1>
            <h2 className="text-lg w-full">
              {track.artists.map((a) => a.name).join(", ")}
            </h2>
          </div>
        </div>
        {track.preview_url && (
          <audio
            className="mt-4 justify-self-end rounded-lg border-green-300 border-2 shadow-md shadow-green-200"
            controls
            src={track.preview_url}
          />
        )}
      </div>

      <div className="mt-4 bg-slate-200 text-slate-100 p-4 rounded">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-600">
            Features
          </h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {readableFeatures(features).map(([key, value]) => (
              <div
                key={key}
                className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-sm font-medium text-gray-500">
                  {key}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TrackId;
