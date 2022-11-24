import type { SerializeFrom } from "@remix-run/node";
import clsx from "clsx";
import type { Artist } from "shared-types/spotify/artist";

const popularity = (ratio: number) => {
  if (ratio >= 85) {
    return "Mainstream";
  }

  if (ratio >= 75) {
    return "Super popular";
  }

  if (ratio >= 50) {
    return "Popular";
  }

  if (ratio >= 25) {
    return "Underground";
  }

  return "Bedroom artist";
};

type TopArtistsProps = {
  artists: SerializeFrom<Artist[]>;
};

const TopArtists = ({ artists }: TopArtistsProps) => {
  if (!artists) return null;

  return (
    <ul className="text-gray-500 p-4 pl-0 text-sm">
      {artists.map((a, i) => (
        <li key={a.id} className={clsx("flex last:mb-0 mb-2 p-2 pl-0")}>
          <p className={clsx("pr-4")}>{i + 1}</p>
          <img
            className={clsx("h-24 w-24 object-contain")}
            src={a.images?.[0].url}
            alt={a.name}
          />
          <div className={clsx("flex-col flex-nowrap pl-2")}>
            <p className={clsx("flex-grow basis-full font-bold")}>{a.name}</p>
            <p className={clsx("overflow-clip")}>{a.genres.join(", ")}</p>
            <p>
              <b>Followers:</b> {Intl.NumberFormat().format(a.followers.total)}{" "}
              <b>Popularity:</b> {popularity(a.popularity)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TopArtists;
