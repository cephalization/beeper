import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TopTracks from "~/components/TopTracks";
import { getArtist, getArtistTopTracks } from "~/data/api/artist";
import { getAuthFromSession, requestSession } from "~/sessions";
import { popularity } from "~/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  if (!params.artistId) {
    return redirect("/");
  }

  try {
    const artist = await getArtist(params.artistId, auth?.access_token);
    const topTracks = await getArtistTopTracks(
      params.artistId,
      auth?.access_token
    );

    if ("ok" in artist) {
      throw new Error("Artist could not be loaded");
    }

    if ("ok" in topTracks) {
      throw new Error("Artist Top Tracks could not be loaded");
    }

    return json({
      artist,
      topTracks: topTracks.tracks,
    });
  } catch (e) {
    return redirect("/?error=request_error");
  }
};

const ArtistId = () => {
  const { artist, topTracks } = useLoaderData<typeof loader>();
  const image = artist.images.sort((a, b) => b.height - a.height)?.[0]?.url;

  return (
    <div className="w-full">
      <div className="flex w-full justify-between flex-wrap sm:flex-nowrap">
        <div className="flex">
          <img
            className="mr-5 h-40 sm:h-96 w-40 sm:w-96 object-contain"
            src={image}
            alt={artist.name}
          />
          <div className="flex flex-wrap flex-col">
            <h1 className="text-2xl font-bold w-full">{artist.name}</h1>
            <h2 className="text-base w-full">
              <b>Followers:</b>{" "}
              {Intl.NumberFormat().format(artist.followers.total)}
            </h2>
            <h2 className="text-base w-full">
              <b>Popularity:</b> {popularity(artist.popularity)}
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-slate-200 p-4 pb-0 rounded-md">
        <h2 className="text-lg font-medium leading-6 text-gray-600">
          Top Tracks
        </h2>
        <TopTracks tracks={topTracks} />
      </div>
    </div>
  );
};

export default ArtistId;
