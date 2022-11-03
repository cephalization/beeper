import { API_HOST } from "~/config";

export const getLogin = async () => await fetch(`${API_HOST}/login`);

export const getLoginCallback = async (query: string) =>
  await fetch(`${API_HOST}/login/callback?${query}`);
