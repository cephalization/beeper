import { Artist } from "./artist";
import { Track } from "./track";

export type Profile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export type Top<T extends Track | Artist> = {
  href: string;
  items: T[];
  limit: number;
  next?: string | null;
  offset: number;
  previous?: string | null;
  total: number;
};

export type TopTracks = Top<Track>;

export type TopArtists = Top<Artist>;
