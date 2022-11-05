import type { SerializeFrom } from "@remix-run/node";
import type { Track } from "shared-types/spotify/track";
import { formatDuration } from "~/utils";
import Link from "../Link";

type TrackSearchResultProps = {
  track: SerializeFrom<Track>;
};

const TrackSearchResult = ({ track }: TrackSearchResultProps) => {
  return (
    <tr key={track.id}>
      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 max-w-sm xl:w-auto">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={track.album.images?.[0]?.url}
              alt={`Album - ${track.album.name}`}
            />
          </div>
          <div className="ml-4 pr-10 max-w-full">
            <Link
              to={`/track/${track.id}`}
              className="block whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900"
            >
              {track.name}
            </Link>
            <p className="text-gray-500">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{track.album.name}</div>
      </td>
      <td className="hidden xl:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formatDuration(track.duration_ms)}
      </td>
    </tr>
  );
};

export default TrackSearchResult;
