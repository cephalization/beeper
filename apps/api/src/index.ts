import { createServer } from "./server";

const start = async () => {
  const port = process.env.PORT || 5001;
  const server = await createServer();

  const listener = server.listen(port, () => {
    console.log(`api running on ${port}`);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    listener.close(() => {
      console.log("HTTP server closed");
    });
  });
};

start();
