import type { SerializeFrom } from "@remix-run/node";
import type { Artist } from "shared-types/spotify/artist";

type TopArtistsProps = {
  artists: SerializeFrom<Artist[]>;
};

const TopArtists = ({ artists }: TopArtistsProps) => {
  if (!artists) return null;

  return (
    <ol className="text-gray-500 p-4 text-sm list-decimal">
      {artists.map((a) => (
        <li key={a.id}>{a.name}</li>
      ))}
    </ol>
  );
};

export default TopArtists;
