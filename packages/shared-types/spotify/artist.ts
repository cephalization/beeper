import { ExternalUrls } from "./meta";

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
};

export enum ArtistType {
  Artist = "artist",
}
