import type { SerializeFrom } from "@remix-run/node";
import clsx from "clsx";
import type { Track } from "shared-types/spotify/track";
import Link from "../Link";

type TopTracksProps = {
  tracks: SerializeFrom<Track[]>;
};

const TopTracks = ({ tracks }: TopTracksProps) => {
  if (!tracks) return null;

  return (
    <ul className={clsx("text-gray-500 p-4 pl-0 text-sm")}>
      {tracks.map((t, i) => (
        <li key={t.id} className={clsx("flex last:mb-0 mb-2 p-2 pl-0")}>
          <p className={clsx("pr-4")}>{i + 1}</p>
          <img
            className={clsx("h-24 w-24")}
            src={t.album.images?.[0]?.url}
            alt={`${t.name} - ${t.artists.map((a) => a.name).join(", ")} - ${
              t.album.name
            }`}
          />
          <div className={clsx("flex-col pl-2")}>
            <Link
              to={`/track/${t.id}`}
              className={clsx("flex-grow basis-full font-bold")}
            >
              {t.name}
            </Link>
            <p className={clsx("flex-shrink")}>
              {t.artists
                .map((a) => (
                  <Link key={a.id} to={`/artist/${a.id}`}>
                    {a.name}
                  </Link>
                ))
                .flatMap((a) => [a, ", "])
                .slice(0, -1)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TopTracks;
