import { createClient } from "redis";
import { REDIS_URI } from "../config";

const createRedisClient = () => {
  const client = createClient({ url: REDIS_URI });
  client.on("error", (err) => console.error("Redis connection failure", err));

  return client;
};

const client = createRedisClient();

export const getClient = () => client;
