import { useParams } from "@remix-run/react";

const TrackId = () => {
  const params = useParams();
  return <div>Track: {params.trackId}</div>;
};

export default TrackId;
