import type { SerializeFrom } from "@remix-run/node";
import type { SpotifyTrackSearchResponse } from "shared-types";
import TrackSearchResult from "./TrackSearchResult";

type SearchResultsProps = {
  results: SerializeFrom<SpotifyTrackSearchResponse>;
};

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <ul>
      {results.tracks.items.map((r) => (
        <TrackSearchResult key={r.id} track={r} />
      ))}
    </ul>
  );
};

export default SearchResults;
