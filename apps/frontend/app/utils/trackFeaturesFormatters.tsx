import type { TrackFeatures } from "shared-types/spotify/track";
import { formatDuration, KEY_INDEX_TO_KEY } from "./utils";

export type FormatterFunctions<T extends Record<string, unknown>> = {
  [Property in keyof T]: (value: string | number) => [string, React.ReactNode];
};

export const formatters: Partial<FormatterFunctions<TrackFeatures>> = {
  acousticness: (a) => ["Acousticness", a],
  duration_ms: (d) => [
    "Duration",
    typeof d === "string" ? null : formatDuration(d),
  ],
  key: (k) => {
    const key =
      typeof k === "string"
        ? "Unknown key"
        : (
            <span className="flex items-center">
              {KEY_INDEX_TO_KEY?.[k].map((k, i) => {
                if (i === 0) {
                  return <p key={k}>{k}</p>;
                }

                return (
                  <p key={k} className="text-xl font-normal">
                    , {k}
                  </p>
                );
              })}
            </span>
          ) ?? "Unknown key";

    return ["Key", key];
  },
  tempo: (value) => [
    "BPM (Tempo)",
    typeof value === "string" ? value : Math.floor(value),
  ],
  time_signature: (value) => ["Time Signature", `${value}/4`],
  energy: (e) => ["Energy", e],
} as const;

export const isFormatter = (
  maybeFormatter: unknown
): maybeFormatter is (v: string | number) => [string, React.ReactNode] =>
  typeof maybeFormatter === "function";

export const readableFeatures = (
  features: TrackFeatures
): [string, React.ReactNode][] =>
  Object.entries(features).flatMap(([_key, value]) => {
    const key = _key as keyof TrackFeatures;
    const formatter = formatters[key];

    if (isFormatter(formatter)) {
      return [formatter(value)];
    }

    return [];
  });
