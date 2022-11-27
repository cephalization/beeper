import { Duration } from "luxon";

export const formatDuration = (durationMs: number) => {
  let baseDuration = Duration.fromMillis(durationMs).toFormat("hh:m:ss");

  if (baseDuration.length > 5 && baseDuration.startsWith("00")) {
    // trim 00:xx:xx to xx:xx
    baseDuration = baseDuration.slice(3);
  }

  return baseDuration;
};

// export const KEY_INDEX_TO_KEY = {
//   0: ["C", "B♯"],
//   1: ["C♯", "D♭"],
//   2: ["D"],
//   3: ["E", "F♭"],
//   4: ["F", "E♯"],
//   5: ["F", "E♯"],
//   6: ["F♯", "G♭"],
//   7: ["G"],
//   8: ["G♯", "A♭"],
//   9: ["A"],
//   10: ["A♯", "B♭"],
//   11: ["B"],
// } as const;

export const KEY_INDEX_TO_KEY = [
  ["C", "B♯"],
  ["C♯", "D♭"],
  ["D"],
  ["E", "F♭"],
  ["F", "E♯"],
  ["F", "E♯"],
  ["F♯", "G♭"],
  ["G"],
  ["G♯", "A♭"],
  ["A"],
  ["A♯", "B♭"],
  ["B"],
] as const;

export const popularity = (ratio: number) => {
  if (ratio >= 85) {
    return "Mainstream";
  }

  if (ratio >= 75) {
    return "Super popular";
  }

  if (ratio >= 50) {
    return "Popular";
  }

  if (ratio >= 25) {
    return "Underground";
  }

  return "Bedroom artist";
};
