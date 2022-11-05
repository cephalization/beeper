import type { SerializeFrom } from "@remix-run/node";
import type { SpotifyTrackSearchResponse } from "shared-types";
import TrackSearchResult from "./TrackSearchResult";

type SearchResultsProps = {
  results: SerializeFrom<SpotifyTrackSearchResponse>;
};

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div className="w-full pl-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 md:rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Album
                    </th>
                    <th
                      scope="col"
                      className="hidden xl:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.tracks.items.map((track) => (
                    <TrackSearchResult key={track.id} track={track} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;