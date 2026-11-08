import { createApp } from "./app.ts";
import { ABOUT, getConfig } from "./constants.ts";

const { port, allowedOrigins } = getConfig();

const server = createApp({ allowedOrigins }).listen(port, error => {
  if (error) {
    console.error(error);
    process.exitCode = 1;
    return;
  }
  console.info(`${ABOUT} listening at http://localhost:${port} (pid ${process.pid})`);
});
const shutdown = () => {
  server.close(error => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
