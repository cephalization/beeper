export type ExternalUrls = {
  spotify: string;
};

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc: string;
}

export enum ItemType {
  Track = "track",
}
