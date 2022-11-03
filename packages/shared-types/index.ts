import type { Profile } from "./spotify/profile";

export type SpotifyAuthorizationResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  expires: Date;
};

export type SpotifyProfileResponse = Profile;

export type AuthorizationCallbackResponse = SpotifyAuthorizationResponse & {
  profile: SpotifyProfileResponse;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  image_url?: string;
  name: string;
};
