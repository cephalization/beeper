import dotenv from "dotenv";
dotenv.config();

export const REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT || "http://localhost:3000/login/callback";
export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const requiredEnv = [CLIENT_ID, CLIENT_SECRET];

if (requiredEnv.some((e) => e === undefined)) {
  throw new Error("Required environment variables not found");
}

const authBuffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  "base64"
);
export const BasicAuthentication = `Basic ${authBuffer}`;
