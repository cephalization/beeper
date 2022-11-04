import { Album } from "./album";
import { Artist } from "./artist";
import { ExternalIDS, ExternalUrls, ItemType } from "./meta";

export type Tracks = {
  href: string;
  items: Track[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: ItemType;
  uri: string;
};
