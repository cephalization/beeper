import invariant from "tiny-invariant";

export const NODE_ENV = process.env.NODE_ENV;
export const API_HOST = process.env.API_HOST || "http://localhost:5001";

invariant(process.env.COOKIE_SECRET, "COOKIE_SECRET env value is required");
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
