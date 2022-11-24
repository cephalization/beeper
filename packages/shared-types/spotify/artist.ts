import { ExternalUrls, Image } from "./meta";
import { Followers } from "./profile";

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  popularity: number;
  images: Image[];
  genres: string[];
  followers: Followers;
  uri: string;
};

export enum ArtistType {
  Artist = "artist",
}
