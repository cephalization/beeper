import type { SerializeFrom } from "@remix-run/node";
import type { SpotifyTrackSearchResponse } from "shared-types";
import TrackSearchResult from "./TrackSearchResult";

type SearchResultsProps = {
  results: SerializeFrom<SpotifyTrackSearchResponse>;
};

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div>
      <div className="mt-4 flex flex-col">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-slate-200 md:rounded-lg">
              <thead className="bg-slate-200">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-600"
                  >
                    Album
                  </th>
                  <th
                    scope="col"
                    className="hidden xl:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-600"
                  >
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {results.tracks.items.map((track) => (
                  <TrackSearchResult key={track.id} track={track} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
