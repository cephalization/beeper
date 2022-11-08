import type { SerializeFrom } from "@remix-run/node";
import type { Track } from "shared-types/spotify/track";
import Link from "../Link";

type TopTracksProps = {
  tracks: SerializeFrom<Track[]>;
};

const TopTracks = ({ tracks }: TopTracksProps) => {
  if (!tracks) return null;

  return (
    <ol className="text-gray-500 p-4 text-sm list-decimal">
      {tracks.map((t) => (
        <li key={t.id}>
          <Link to={`/track/${t.id}`}>{t.name}</Link> -{" "}
          {t.artists.map((a) => a.name).join(", ")}
        </li>
      ))}
    </ol>
  );
};

export default TopTracks;
