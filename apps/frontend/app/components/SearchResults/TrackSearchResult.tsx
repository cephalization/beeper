import type { SerializeFrom } from "@remix-run/node";
import type { Track } from "shared-types/spotify/track";

type TrackSearchResultProps = {
  track: SerializeFrom<Track>;
};

const TrackSearchResult = ({ track }: TrackSearchResultProps) => {
  return (
    <li>
      <img
        src={track.album.images?.[0]?.url}
        alt={`Album - ${track.album.name}`}
        className="h-10 w-10"
      ></img>
      <div>{track.name}</div>
      <div>{track.artists.map((a) => a.name).join(", ")}</div>
    </li>
  );
};

export default TrackSearchResult;
