import { Duration } from "luxon";

export const formatDuration = (durationMs: number) => {
  let baseDuration = Duration.fromMillis(durationMs).toFormat("hh:m:ss");

  if (baseDuration.length > 5 && baseDuration.startsWith("00")) {
    // trim 00:xx:xx to xx:xx
    baseDuration = baseDuration.slice(3);
  }

  return baseDuration;
};
