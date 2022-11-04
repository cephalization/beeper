import { Artist } from "./artist";
import { ExternalUrls, Image, ReleaseDatePrecision } from "./meta";

export type Album = {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
};

export enum AlbumTypeEnum {
  Album = "album",
  Compilation = "compilation",
  Single = "single",
}
